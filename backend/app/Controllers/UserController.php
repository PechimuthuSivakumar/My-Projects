<?php

namespace App\Controllers;

use App\Controllers\BaseController;

use App\Models\UserModel;
use CodeIgniter\API\ResponseTrait;
use App\Models\SessionControl;

class UserController extends BaseController
{
    use ResponseTrait;
    public $UserModel;
    public $session;
    public function __construct(){
        $this->UserModel = new UserModel();
        $this->session = new SessionControl();
        helper(['url','form']);
    }
    public function index()
    {
        $sessionid = $this->request->getVar('sessionId');
        $role = $this->session->where('id',$sessionid)->first();
        if($role['role'] != 'hr'){
            return $this->respond(['message' => 'Unauthorized'], 401);
        }
        $name = $this->request->getVar('name') ? $this->request->getVar('name') : '';
        $page = $this->request->getVar('page') ? $this->request->getVar('page') : 1;
        $limit = $this->request->getVar('limit') ? $this->request->getVar('limit') : 10;
        $offset = ($page - 1) * $limit;
        $this->UserModel;
        if($name != ""){
            $this->UserModel->like('name', $name);
            $this->UserModel->orLike('email', $name);
            $this->UserModel->orLike('phone', $name);
            $this->UserModel->orLike('role', $name);
        }
        $this->UserModel->limit($limit, $offset);
        $data = $this->UserModel->orderBy('id', 'DESC')->findAll();
        $response = [
            'status' => 200,
            'success' => true,
            'message' => 'Data fetched successfully',
            'data' => [
                'data' => $data,
                'paginator' => [
                    'itemCount' => $this->UserModel->countAllResults(),
                    'offset' => $offset,
                    'perPage' => $limit,
                    'pageCount' => ceil($this->UserModel->countAllResults() / $limit),
                    'currentPage' => $page,
                    'slNo' => ($offset + 1),
                    'hasPrevPage' => ($page > 1) ? true : false,
                    'hasNextPage' => ($page < ceil($this->UserModel->countAllResults() / $limit)) ? true : false,
                    'prev' => ($page > 1) ? $page - 1 : null,
                    'next' => ($page < ceil($this->UserModel->countAllResults() / $limit)) ? $page + 1 : null
                ]
            ]
        ];

        return $this->respond($response, 200);
    }

    public function getSingleUser(){
        try{
        $url = explode('/',$this->request->getUri()->getPath());
        $segment = $url[array_key_last($url)];
        $data = $this->UserModel->where('uid', $segment)->first();
        $response = [
            'status' => 200,
            'success' => true,
            'message' => 'Data fetched successfully',
            'data' => $data
        ];
        return $this->respond($response, 200);
    }
    catch(\Exception $e){
        $response = [
            'status' => 500,
            'success' => false,
            'message' => $e->getMessage()
        ];
        return $this->respond($response, 500);
    }
}
    
    public function createUser(){
        try{
            $sessionid = $this->request->getVar('sessionId');
            $role = $this->session->where('id',$sessionid)->first();
            if($role['role'] != 'hr'){
                return $this->respond(['message' => 'Unauthorized'], 401);
            }
            $rules = [
                'name' => ['rules' => 'required|min_length[4]|max_length[255]'],
                'email' => ['rules' => 'required|min_length[4]|max_length[255]|valid_email|is_unique[users.email]'],
                'password' => ['rules' => 'required|min_length[4]|max_length[255]'],
                'phone' => ['rules' => 'required|numeric'],
                'role' => ['rules' => 'required'],
            ];
    
            if(!$this->validate($rules)){
                $response = [
                    'errors' => $this->validator->getErrors(),
                    'message' => 'Invalid Inputs'
                ];
                return $this->respond($response , 409);
            }
    
            $data = [
                'email'    => $this->request->getVar('email'),
                'password' => password_hash($this->request->getVar('password'), PASSWORD_DEFAULT),
                'name'     => $this->request->getVar('name'),
                'phone'    => $this->request->getVar('phone'),
                'role'     => $this->request->getVar('role'),
                'uid' => uniqid(),
            ];

            $resQ = $this->UserModel->where('email', $data['email'])->countAllResults();
            if($resQ > 0){
                return $this->respond(['message' => 'Email already exists'], 409);
            }
    
            $this->UserModel->insert($data);
    
            return $this->respond(['message' => 'Registered Successfully'], 200);
        }catch(\Exception $e){
            $response = [
                'status' => 500,
                'success' => false,
                'message' => $e->getMessage()
            ];
            return $this->respond($response, 500);
        }
    }

    public function updateUser(){
        try{
            $sessionid = $this->request->getVar('sessionId');
            $role = $this->session->where('id',$sessionid)->first();
            if($role['role'] != 'hr'){
                return $this->respond(['message' => 'Unauthorized'], 401);
            }
            $data = [
                'email'    => $this->request->getVar('email'),
                'name'     => $this->request->getVar('name'),
                'phone'    => $this->request->getVar('phone'),
                'role'     => $this->request->getVar('role'),
            ];
            $url = explode('/',$this->request->getUri()->getPath());
            $segment = $url[array_key_last($url)];
            $rules = [
                'name' => ['rules' => 'required|min_length[4]|max_length[255]'],
                'email' => ['rules' => 'required|min_length[4]|max_length[255]|valid_email'],
                'phone' => ['rules' => 'required|numeric'],
                'role' => ['rules' => 'required'],
            ];
    
            if(!$this->validate($rules)){
                $response = [
                    'errors' => $this->validator->getErrors(),
                    'message' => 'Invalid Inputs'
                ];
                return $this->respond($response , 409);
            }

           
    
            $this->UserModel->set($data)->where('uid', $segment)->update();
    
            return $this->respond(['message' => 'Updated Successfully'], 200);
        } catch(\Exception $e){
            $response = [
                'status' => 500,
                'success' => false,
                'message' => $e->getMessage()
            ];
            return $this->respond($response, 500);
        }
    }
}
