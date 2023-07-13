<?php 
header( "Content-Type: text/html; charset=utf-8" );
header( "refresh:5; url =/" ); 


//@param
$title = 'Обращение на сайт M.Implant';//title letter
//////////////////FROM/////////////////////////
$name_sender = 'Implant заявка ';
$email_sender = 'Implant Bot'; //от кого 
//////////////////WHOM/////////////////////////
$name_recipient ='name';
$email_recipient ='shatsovniy25@gmail.com'; //кому put.artiom@gmail.com 
//////////////////////////////////////////////

?>
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>Дякуємо за Вашу заявку.</title>
    <link rel="stylesheet" href="../css/bootstrap.min.css">
    <link rel="stylesheet" href="../css/main.css">
</head>
<body>
<div class="container">
    <div class="row" style="text-align:center;">
        <div class="col-xs-12">
           <br>
           <br>
           <br>
           <br>
           <br>
            <h1 class="text-center">Ваша заявка Відправлена<br> Через деякий час з Вами зв'яжеться наш менеджер.</h1>
        </div>
    </div>
</div>
</body>
</html>
<?php

  /**
  * clear input tegs
  * @param string $value input
  * @return  $result string clear input
  */
  function clean( $value = "") {
      $value = trim($value);
      $value = stripslashes($value);
      $value = strip_tags($value);
      $value = htmlspecialchars($value);
      
      return $value;
  }

if ( isset($_POST['phone']) ) {
  $name   = clean( $_POST['name']);
  $phone   = clean( $_POST['phone']);
  $email   = clean( $_POST['email']);
  $subject   = clean( $_POST['subject']);
  $message   = clean( $_POST['message']);
  $review   = clean( $_POST['review']);
  
}


$body='<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
  <title>'.$title.'</title>
</head>
<body>
  <div style="width: 640px; font-family: Arial, Helvetica, sans-serif; font-size: 20px;">
    <h3>'.$title.'</h3>
    <div align="center">
        Name:     '.$name.' <br>
        phone: '.$phone.'<br>
        email: '.$email.'<br>
        subject: '.$subject.'<br>
        message: '.$message.$review.'<br>
    </div>
    
  </div>
</body>
</html>
';

require 'class.phpmailer.php';
//Create a new PHPMailer instance
$mail = new PHPMailer();
$mail->CharSet = 'utf-8';
//Set who the message is to be sent from
$mail->setFrom("$email_sender", "$name_sender");
//Set an alternative reply-to address
$mail->addReplyTo("$email_recipient", "$name_recipient");
//Set who the message is to be sent to
$mail->addAddress("$email_recipient", "$name_recipient");
//Set the subject line
$mail->Subject = "$title"."$phone";
//Read an HTML message body from an external file, convert referenced images to embedded,
//convert HTML into a basic plain-text alternative body
$mail->msgHTML($body);
//Replace the plain text body with one created manually
$mail->AltBody = 'This is a plain-text message body';
//Attach an image file
//$mail->addAttachment('images/phpmailer_mini.gif');
if(isset($_FILES['fileAttach'])) { 
    if($_FILES['fileAttach']['error'] == 0){ 
      $mail->AddAttachment($_FILES['fileAttach']['tmp_name'], $_FILES['fileAttach']['name']); 
      //move_uploaded_file($_FILES["fileAttach"]["tmp_name"], "cfiles/".$_FILES["fileAttach"]["name"]);
    } 
} 
//send the message, check for errors
if (!$mail->send()) {
    /*echo "Mailer Error: " . $mail->ErrorInfo;*/
} else {
    /*echo "Message sent!";*/
}



///////////////////////////////////CRM///////////////////////////////////////////
// Получаем значения полей из формы

$name = $name;
$phone = $phone;
$platform = 'fb';
$campain_name = 'm_implants_campain';
$form_name = 'form1';
$adset_name = 'group1';
$ad_name = 'adname1';

// Создаем массив с данными
$data = array(
  'name' => $name,
  'phone' => $phone,
  'platform' => $platform,
  'campain_name' => $campain_name,
  'form_name' => $form_name,
  'adset_name' => $adset_name,
  'ad_name' => $ad_name
);

// Создаем ресурс cURL
$ch = curl_init();

// Устанавливаем URL для отправки запроса
$url = 'https://drcare.123451.fun/leads/apiaddlead?token=sdf23sdfsdfHK4swdf';

// curl_setopt($ch, CURLOPT_URL, $url);
// // Устанавливаем метод запроса на POST
// curl_setopt($ch, CURLOPT_POST, 1);
// // Устанавливаем данные для отправки
// curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
// // Получаем ответ в виде строки
// curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
// // Выполняем запрос
// $response = curl_exec($ch);
// // Закрываем ресурс cURL
// curl_close($ch);


// Обрабатываем ответ
if ($response === false) {
  // Ошибка при отправке запроса
  echo 'Произошла ошибка при отправке данных.';
} else {
  // Обрабатываем ответные данные, если необходимо
  // ...

  // Выводим сообщение об успешной отправке
  echo 'Данные успешно отправлены.';
}


?>

