<?php

namespace App\Models;

use CodeIgniter\Model;

use Config\Database;
use CodeIgniter\Database\RawSql;

class AllSubject extends Model
{
    protected $table            = 'subject_master';
    protected $primaryKey       = 'id';
    protected $allowedFields    = ['id','sub_name','created_at'];
    public $db;
    public function __construct()
    {
        $this->db = \Config\Database::connect();
    }
    public function getAllsub($search = ""){
        $table = $this->db->table('subject_master');
        $table->select('subject_master.*');
        $table->select('count(Distinct t1.id) as tmcount');
        $table->select('count(t2.id) as stcount');
        $table->join('topic_master t1','t1.sub_id = subject_master.id','LEFT');
        $table->join('sub_topic t2','t2.tid = t1.id','LEFT');
        $table->groupBy('subject_master.id');
        $query = $table->get();
         $records = $query->getResult();
        return $records;
    }
    public function getSingleSub($id){
        $table = $this->db->table('subject_master');
        $table->select('subject_master.*');
        $table->select('count(Distinct t1.id) as tmcount');
        $table->select('count(Distinct t2.id) as stcount');
        $table->join('topic_master t1','t1.sub_id = subject_master.id','LEFT');
        $table->join('sub_topic t2','t2.sub_id = subject_master.id','LEFT');
        $table->groupBy('subject_master.id');
        $table->where('subject_master.id',$id);
        $query = $table->get();
        $first =  $query->getResult();

        $table2 = $this->db->table('topic_master');
        $table2->select('topic_master.*');
        $table2->select('count(Distinct t2.id) as stcount');
        $table2->join('sub_topic t2','t2.tid = topic_master.id','LEFT');
        $table2->groupBy('topic_master.topic_name');
        $table2->where('topic_master.sub_id',$id);
        $query2 = $table2->get();
        $second =  $query2->getResult();
        return [
            'subjects' => $first,
            'topics' => $second
        ]; 
    }
    public function getTopics($topicid,$subid){
        $table = $this->db->table('subject_master');
        $table->select('subject_master.*');
        $table->select('t1.topic_name');
        $table->select('count(Distinct t2.id) as stcount');
        $table->join('topic_master t1','t1.sub_id = subject_master.id','LEFT');
        $table->join('sub_topic t2','t2.sub_id = subject_master.id','LEFT');
        $table->groupBy('subject_master.id');
        $table->where('subject_master.id',$subid);
        $table->where('t1.id',$topicid);
        $table->where('t2.sub_id',$subid);
        $table->where('t2.tid',$topicid);
        $query = $table->get();
        $first =  $query->getResult();

        $table2 = $this->db->table('sub_topic');
        $table2->select('*');
        $table2->where('sub_id',$subid);
        $table2->where('tid',$topicid);
        $query2 = $table2->get();
        $second =  $query2->getResult();
        return [
            'subjects' => $first,
            'topics' => $second
        ];
    }
    public function addTopics($data){
        $table = $this->db->table('topic_master');
        $select = $table->select('*')
        ->where('topic_name',$data['topic_name'])
        ->where('sub_id',$data['sub_id'])
        ->countAllResults();
        if($select != 0){
            return "exists";
        }
        $table->insert($data);
        return "done";
    }
    public function addSubtopic($data){
        $table = $this->db->table('sub_topic');
        $select = $table->select('*')
        ->where('topic_name',$data['topic_name'])
        ->where('sub_id',$data['sub_id'])
        ->where('tid',$data['tid'])
        ->countAllResults();
        if($select != 0){
            return "exists";
        }
        $table->insert($data);
            return "done";
    }
}
