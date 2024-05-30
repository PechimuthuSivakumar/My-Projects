<?php

namespace App\Controllers;

use App\Controllers\BaseController;
use CodeIgniter\API\ResponseTrait;
use App\Models\UserModel;
use \Firebase\JWT\JWT;
use App\Models\SessionControl;

use Firebase\JWT\ExpiredException;
use Firebase\JWT\SignatureInvalidException;
use Firebase\JWT\BeforeValidException;

class Login extends BaseController
{
    use ResponseTrait;
    public $Usermodal;
    public $session;
    public function __construct()
    {   
       helper(['url','form']);
       $this->Usermodal = new UserModel();
       $this->session = new SessionControl();
    }
    public function index()
    {
        $json = $this->request->getJSON();

        $email = isset($json->email) ? $json->email : "";
        $password = isset($json->password) ? $json->password : "";

        if($email == "" || $password == ""){
            return $this->respond(['status' => false,'message'=>'Please enter email and password'],404);
        }

        $user = $this->Usermodal->where('email', $email)->first();
        if($user == null){
            return $this->respond(['status' => false,'message'=>'user not found'],404);
        }

        if(!password_verify($password, $user['password'])){
            return $this->respond(['status' => false,'message'=>'Password not match'],404);
        }
            $key = getenv('JWT_SECRET');
            $iat = time(); // current timestamp value
            $exp = $iat + 3600 * 24 * 366;

            $id = $user['uid'];

            $payload = [
                "iat" => $iat, //Time the JWT issued at
                "exp" => $exp, // Expiration time of token
                "email" => $email,
                "userid" => $id,
            ];

            $token = JWT::encode($payload, $key, 'HS256');
            $sisid = uniqid();
            $sessionData = [
                'id' => $sisid,
                'user_id' => $id,
                'name' => $user['name'],
                'email' => $email,
                'payload' => $token,
                'ip' => $this->request->getIPAddress(),
                'agent' => $this->request->getUserAgent(),
                'role' => $user['role'],
                'loged' => 1,
                'login_id' => $id,
                'session_active_status' => 1,
                'login' => date('Y-m-d H:i:s'),
            ];

            $this->session->insert($sessionData);

            $response = [
                "logged_in" => true,
                "token" => $token,
                "user" => [
                    'id' => uniqid(),
                    'email' => $email,
                    "role" => $user['role'],
                    "name" => $user['name'],
                    "sessionId" => $sisid
                ],
            ];
            return $this->respond($response,200);
    }

    public function logout(){
        $url = explode('/',$this->request->getUri()->getPath());
        $segment = $url[array_key_last($url)];
        $query = $this->session->set(['loged'=>0,'session_active_status'=>0,'logout' => date('Y-m-d H:i:s')])->where('id', $segment)->update();
        if($query){
            return $this->respond(['status','Logged out successfully'],200);
        }else{
            return $this->respond(['status','fail'],401);
        }
    }
}
