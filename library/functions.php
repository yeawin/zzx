<?php
function cutStr($string, $length) {
    $strcut = '';
    $strLength = 0;
    if(strlen($string) > $length) {
        //将$length换算成实际UTF8格式编码下字符串的长度
        for($i = 0; $i < $length; $i++) {
            if ( $strLength >= strlen($string) )
                break;
            //当检测到一个中文字符时
            if( ord($string[$strLength]) > 127 )
                $strLength += 3;
            else
                $strLength += 1;
        }
        return substr($string, 0, $strLength);
    } else {
        return $string;
    }
}