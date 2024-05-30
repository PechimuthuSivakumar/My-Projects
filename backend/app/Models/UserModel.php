<?php

namespace App\Models;

use CodeIgniter\Model;

class UserModel extends Model
{
    protected $table            = 'users';
    protected $allowedFields    = ['id','uid','name','phone','email','password','role','created_at','updated_at'];
}
