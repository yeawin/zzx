<?php

class ShopController extends Zend_Controller_Action
{

    public function init()
    {
        /* Initialize action controller here */
    }

    public function indexAction()
    {
        // action body
        $Shop = new Application_Model_Shop();
        $shoplist = $Shop->getShops();
        $this->view->shoplist = $shoplist;
    }
    
    public function listAction()
    {
        // action body
        $Shop = new Application_Model_Shop();
        $shoplist = $Shop->getShops();
        $this->view->shoplist = $shoplist;
        return true;
    }

    public function signinAction()
    {
        // 商家入驻

    }

    public function signedAction()
    {
        // 处理商家入驻
        $Params = $this->getAllParams();
        if (!("on" == $Params["ServicePromise"])) {
            $result['error'] = 2;
            $result['message'] = '您没有选择同意服务承诺！';
            return false;
        } else {
            $Shop = new Application_Model_Shop();
            if ($Shop->isShopNameExist($Params["ShopName"])) {
                $status = $Shop->getStatus($Params["ShopName"]);
                if (0 == $status) {
                    $result['error'] = 1;
                    $result['message'] = '您已经填写过入驻信息，我们将尽快审核，请勿重复提交，在通过审核之前您可以通过修改页面进行修改！';
                } else {
                    $result['error'] = 1;
                    $result['message'] = '您已经填写过入驻信息，并已通过审核！';
                }
                $this->view->result = $result;
                return false;
            }
            
            if(!isset($_FILES["ShopLogo"])) {
                $result['error'] = 2;
                $result['message'] = '请提供您的LOGO再上传！';
                $this->view->result = $result;
                return false;
            } else if (!is_uploaded_file($_FILES["ShopLogo"]["tmp_name"])) {
                $result['error'] = 2;
                $result['message'] = '信息提交失败：LOGO上传失败！';
                $this->view->result = $result;
                return false;
            } else {
                if ($_FILES["ShopLogo"]["error"] == UPLOAD_ERR_OK) {
                    $link = "/images/shoplogoes/".md5($Params["ShopName"]).".".substr($_FILES["ShopLogo"]["name"],strpos($_FILES["ShopLogo"]["name"],'.') + 1,strlen($_FILES["ShopLogo"]["name"]) - strpos($_FILES["ShopLogo"]["name"],'.') - 1);
                    $destination = PROJECT_PATH."/public".$link;
                    //上传图片到服务器，临时文件，生成图片服务器后删除
                    move_uploaded_file($_FILES["ShopLogo"]["tmp_name"], $destination); //移动到指定目录
                }
            }
            $data['shop_name'] = $Params["ShopName"];       //商家名称
            $data['busy_type'] = $Params["ServiveType"];    //服务类型
            $data['address'] = $Params["ShopAddress"];      //商家地址
            $data['remark'] = $Params["ShopRemark"];        //商家描述
            $data['shop_logo'] = ".".$link;              //商家Logo
            if ($Shop->insertRecord($data)) {
                $result['error'] = 0;
                $result['message'] = '信息提交成功，我们将尽快进行审核！';
                $this->view->result = $result;
                return true;
            } else {
                $result['error'] = 2;
                $result['message'] = '信息提交失败！';
                $this->view->result = $result;
                return false;
            }
        }
    }
}
