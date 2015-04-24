<?php

class DemoController extends Zend_Controller_Action
{

    public function init()
    {
        /* Initialize action controller here */
        $this->view->headScript()
        ->prependFile($this->view->baseUrl("/static/plugins/ie10-viewport-bug-workaround.js"))
        ->prependFile($this->view->baseUrl("/static/jquery.plugins/bootstrap/js/bootstrap.min.js"))
        ->prependFile($this->view->baseUrl("/static/jquery.plugins/jquery.migrate.js"))
        ->prependFile($this->view->baseUrl("/static/jquery.plugins/jquery.js"));
        $this->view->headLink()
        ->appendStylesheet($this->view->baseUrl("/static/jquery.plugins/bootstrap/css/bootstrap.min.css"))
        ->appendStylesheet($this->view->baseUrl("/static/css/style.css"));
    }

    public function indexAction()
    {
        // action body
    }

    public function sqglAction()
    {
        // action body
    }

    public function jzglAction()
    {
        // action body
    }

    public function shfwAction()
    {
        // action body
    }


}







