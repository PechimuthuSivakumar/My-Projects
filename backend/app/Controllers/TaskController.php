<?php

namespace App\Controllers;

use App\Controllers\BaseController;
use CodeIgniter\API\ResponseTrait;
use App\Models\TaskModel;
use App\Models\SessionControl;
use App\Models\UserModel;
use \Firebase\JWT\JWT;
class TaskController extends BaseController
{
    use ResponseTrait;
    public $taskmodel;
    public $session;
    public $usermodel;
    public function __construct(){
        $this->taskmodel = new TaskModel();
        $this->session = new SessionControl();
        $this->usermodel = new UserModel();
    }
    public function index()
    {

        //tasks table logics here
        $headers = getallheaders();
        $token = explode(' ',$headers['Authorization'])[1];
        $decode = json_decode(base64_decode(str_replace('_', '/', str_replace('-','+',explode('.', $token)[1]))));
        $uid = $decode->userid;
        $userdata = $this->usermodel->select('*')->where('uid',$uid)->first();
        $name = $this->request->getVar('name') ? $this->request->getVar('name') : '';
        $page = $this->request->getVar('page') ? $this->request->getVar('page') : 1;
        $limit = $this->request->getVar('limit') ? $this->request->getVar('limit') : 10;
        $offset = ($page - 1) * $limit;
        // role Controlls for datatbales for getting data
        if($userdata['role'] == 'em'){
            $this->taskmodel->select('*');
            $this->taskmodel->where('user_tasks.uid',$uid);
        }
        if($userdata['role'] == 'rm'){
            $this->taskmodel->select('user_tasks.*,users.name');
            $this->taskmodel->join('users', 'users.uid = user_tasks.uid');
        }
        if($userdata['role'] == 'hr'){
            $this->taskmodel->select('user_tasks.*,users.name');
            $this->taskmodel->join('users', 'users.uid = user_tasks.mid');
            $this->taskmodel->where('user_tasks.status !=',0);
        }
        if($name != ""){
            $this->taskmodel->like('user_tasks.task', $name);
        }
        $this->taskmodel->limit($limit, $offset);
        $data = $this->taskmodel->orderBy('created_at', 'DESC')->findAll();
        $this->taskmodel;
       
        
        // role Controlls for datatbales with count resultes 
        if($userdata['role'] == 'em'){
            $this->taskmodel->select('*');
            $this->taskmodel->where('user_tasks.uid',$uid);
        }
        if($userdata['role'] == 'rm'){
            $this->taskmodel->select('user_tasks.*,users.name');
            $this->taskmodel->join('users', 'users.uid = user_tasks.uid');
        }
        if($userdata['role'] == 'hr'){
            $this->taskmodel->select('user_tasks.*,users.name');
            $this->taskmodel->join('users', 'users.uid = user_tasks.mid');
            $this->taskmodel->where('user_tasks.status !=',0);
        }
        if($userdata['role'] == 'em'){
            $this->taskmodel->where('uid',$uid);
        }

        $contResult = $this->taskmodel->countAllResults();

        //data fecthed here
        $response = [
            'status' => 200,
            'success' => true,
            'message' => 'Data fetched successfully',
            'data' => [
                'data' => $data,
                'paginator' => [
                    'itemCount' => $contResult,
                    'offset' => $offset,
                    'perPage' => $limit,
                    'pageCount' => ceil($contResult / $limit),
                    'currentPage' => $page,
                    'slNo' => ($offset + 1),
                    'hasPrevPage' => ($page > 1) ? true : false,
                    'hasNextPage' => ($page < ceil($contResult / $limit)) ? true : false,
                    'prev' => ($page > 1) ? $page - 1 : null,
                    'next' => ($page < ceil($contResult / $limit)) ? $page + 1 : null
                ]
            ]
        ];

        return $this->respond($response, 200);
    }

    public function getSingleTask(){
        try{
            $url = explode('/',$this->request->getUri()->getPath());
            $segment = $url[array_key_last($url)];
            $data = $this->taskmodel->where('id', $segment)->first();
            $response = [
                'status' => 200,
                'success' => true,
                'message' => 'Data fetched successfully',
                'data' => $data
            ];
            return $this->respond($response, 200);
        }catch(\Exception $e){
            $response = [
                'status' => 500,
                'success' => false,
                'message' => $e->getMessage()
            ];
            return $this->respond($response, 500);
        }
    }


    public function updateTask(){
        try{
            $url = explode('/',$this->request->getUri()->getPath());
            $segment = $url[array_key_last($url)];
            $rules = [
                'task' => ['rules' => 'required|min_length[4]|max_length[255]'],
            ];
            if(!$this->validate($rules)){
                $response = [
                    'errors' => $this->validator->getErrors(),
                    'message' => 'Invalid Inputs'
                ];
                return $this->respond($response , 409);
            }
            $data = [
                'task' => $this->request->getVar('task'),
                'duration' => $this->request->getVar('duration'),
                'discription'=> $this->request->getVar('discription'),
                'updated_at' => date('Y-m-d H:i:s')
            ];
            $this->taskmodel->set($data)->where('id', $segment)->update();
            $response = [
                'status' => 200,
                'success' => true,
                'message' => 'Updated Successfully'
            ];
            return $this->respond($response, 200);
        }catch(\Exception $e){
            $response = [
                'status' => 500,
                'success' => false,
                'message' => $e->getMessage()
            ];
            return $this->respond($response, 500);
        }
    }

    public function createTask(){
        try{
            $headers = getallheaders();
        $token = explode(' ',$headers['Authorization'])[1];
        $decode = json_decode(base64_decode(str_replace('_', '/', str_replace('-','+',explode('.', $token)[1]))));
        $uid = $decode->userid;
        $userdata = $this->usermodel->select('*')->where('uid',$uid)->first();
            if($userdata['role'] != 'em'){
                return $this->respond(['message' => 'Unauthorized'], 401);
            }
            $rules = [
                'task' => ['rules' => 'required|min_length[4]|max_length[255]'],
            ];
            if(!$this->validate($rules)){
                $response = [
                    'errors' => $this->validator->getErrors(),
                    'message' => 'Invalid Inputs'
                ];
                return $this->respond($response , 409);
            }

            $data = [
                'id' => uniqid(),
                'task' => $this->request->getVar('task'),
                'duration' => $this->request->getVar('duration'),
                'discription'=> $this->request->getVar('description'),
                'uid' => $uid,
                'created_at' => date('Y-m-d H:i:s')
            ];
            $this->taskmodel->insert($data);
            $response = [
                'status' => 200,
                'success' => true,
                'message' => 'Task created successfully'
            ];

            return $this->respond($response, 200);

        } catch(\Exception $e){
            $response = [
                'status' => 500,
                'success' => false,
                'message' => $e->getMessage()
            ];
            return $this->respond($response, 500);
        }
}

public function updateStatus(){
    try{
        $url = explode('/',$this->request->getUri()->getPath());
        $segment = $url[array_key_last($url)];
        $json = $this->request->getJSON();
        $status = isset($json->status) ? $json->status : '';
        $sessionId = isset($json->sessionId) ? $json->sessionId : '';
        $review = isset($json->review) ? $json->review : '';
        if($status != "" || $sessionId != ""){
            $role = $this->session->where('id',$sessionId)->first();
            if($role['role'] == 'em'){
                return $this->respond(['message' => 'Unauthorized'], 401);
            }
            $data = [
                'status' => $status,
                'remarks' => $review,
                'updated_at' => date('Y-m-d H:i:s')
            ];
            if($role['role'] == 'rm'){
                $data['mid'] = $role['user_id'];
            }
            $this->taskmodel->set($data)->where('id', $segment)->update();
            $response = [
                'status' => 200,
                'success' => true,
                'message' => 'Updated Successfully'
            ];
            return $this->respond($response, 200);
        }else{
            return $this->respond(['message' => 'Invalid Inputs'], 409);
        } 
      
    }catch(\Exception $e){
        $response = [
            'status' => 500,
            'success' => false,
            'message' => $e->getMessage()
        ];
        return $this->respond($response, 500);  
}
}
}
