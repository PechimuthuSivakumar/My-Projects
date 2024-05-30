<?php

namespace App\Models;

use CodeIgniter\Model;

class TaskModel extends Model
{
    protected $table            = 'user_tasks';
    protected $allowedFields    = ['id','task','new_state','status','duration','discription','uid','remarks','mid','created_at','updated_at'];
}
