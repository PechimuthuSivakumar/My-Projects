<?php

namespace App\Models;

use CodeIgniter\Model;

class SessionControl extends Model
{
    protected $DBGroup          = 'default';
    protected $table            = 'sessions';
    protected $allowedFields    = ['id','user_id','name','email','payload','ip','agent','role','loged','login_id','session_active_status','login','logout'];
}
