<?php

class Application_Model_Shop extends  Zend_Db_Table_Abstract
{
    protected $_name = 'ecs_shop';
    
    protected $_primary = 'shop_id';
    
    public function getShops()
    {
        $select = $this->select();
        $result = $this->fetchAll($select);
        if (count($result) > 0) {
            $result = $result->toArray();            
        }
        return $result;
    }
    
    /**
     * 查询入驻商家的审核状态
     * @param unknown $ShopName
     * @return Ambigous <>
     */
    public function getStatus($ShopName)
    {
        $select = $this->select();
        $select->from($this->_name, array("do_status"));
        $select->where('shop_name = ?', $ShopName);
        $result = $this->fetchRow($select);
        return $result["do_status"];
    }
    
    public function insertRecord($data)
    {
        return $this->insert($data);
    }

    /**
     * 根据商家名称判断数据库里是否存在该商家的名称
     * @param unknown $ShopName
     * @return boolean
     */
    public function isShopNameExist($ShopName)
    {
        $select = $this->select();
        $select->where('shop_name = ?', $ShopName);
        $result = $this->fetchAll($select);
        return (count($result) > 0);
    }
    
}

