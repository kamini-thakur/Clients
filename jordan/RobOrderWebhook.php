<?php

// $data =file_get_contents('php://input');
// $array =json_decode($data);
// $tempVar = var_export($array, true);


// $fh =fopen('fulfillment/test_ful.txt', 'w');
// fwrite($fh, $data);



error_reporting(E_ALL);
ini_set("display_errors", 1);

//ftp details

$ftp_host = 
$ftp_user_name = 
$ftp_user_pass = 

// $data =file_get_contents('php://input');
$data =file_get_contents('test_ful.txt');
$array =json_decode($data,true);

$fulfillments_list_count = count($array['fulfillments']);

$fulfillments_data = array();

for ($i=0; $i < $fulfillments_list_count ; $i++) { 
	
	$list_items_count = count($array['fulfillments'][$i]['line_items']);

	for ($j=0; $j < $list_items_count ; $j++) { 
		
		$fulfillments_data1 = array(
			'OrderNumber' => $array['order_number'],
			'DatabaseLineNumber' => '',
			'SKU'=> $array['fulfillments'][$i]['line_items'][$j]['sku'],
			'Quantity'=> $array['fulfillments'][$i]['line_items'][$j]['quantity'],
			'Haulier'=> $array['fulfillments'][$i]['tracking_company'],
			'TrackingNumber'=> $array['fulfillments'][$i]['tracking_number']
		);

		array_push($fulfillments_data, $fulfillments_data1);
	}
}

$headers = array(array_keys($fulfillments_data[0]));

function csv(array $data, $filename,$permission, $delimiter = ',', $enclosure = '"') {
    $handle = fopen($filename, $permission);
    foreach ($data as $line) {
        fputcsv($handle, $line, $delimiter, $enclosure);
    }
    rewind($handle);
    $contents = '';
    while (!feof($handle)) {
        $contents .= fread($handle, 8192);
    }
    fclose($handle);
    return $contents;
}

// csv($headers, 'fulfillment/'.$array['id'].'.csv' , 'w+');
// csv($fulfillments_data, 'fulfillment/'.$array['id'].'.csv' , 'a+');


$connect_it = ftp_connect( $ftp_host );
$login_result = ftp_login( $connect_it, $ftp_user_name, $ftp_user_pass );
ftp_pasv($connect_it, true);


$file_list = ftp_nlist($connect_it, "./warehouse/test/fulfillment/");

$file_list[count($file_list)-1];

$last_sequence = substr($file_list[count($file_list)-1], -9 , -4);

$current_sequence = intval($last_sequence) + 1 ;

$current_filename = 'MERCONS0000'.$current_sequence.'.csv';


csv($headers, 'fulfillment/'.$current_filename , 'w+');
csv($fulfillments_data, 'fulfillment/'.$current_filename , 'a+');

$to_ftp = '/warehouse/test/fulfillment/'.$current_filename.'.csv';

if ( ftp_put( $connect_it, $to_ftp, 'fulfillment/'.$current_filename, FTP_BINARY ) ) {
    echo "success\n";
}
else {
    echo "error\n";
}
ftp_close( $connect_it );


?>