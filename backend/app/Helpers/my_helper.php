<?php
    function topic_master($id){
        $db = \config\Database::connect();
        $table = $db->table('topic_master');
        $query = $table->select('count(*)')->where('sub_id',$id)->get();
        return $query->getResult();
    }
?>