//EmailService file - 


//global variables to be used in each emailing function
var founders_IDs = ['shivalik@vahanalytics.com', 'arun@vahanalytics.com', 'someshwar@vahanalytics.com', 'nikhil@vahanalytics.com'];
var contact_ID = ['sales@vahanalytics.com','contact@vahanalytics.com', 'arun@vahanalytics.com', 'someshwar@vahanalytics.com', 'nikhil@vahanalytics.com'];
var sendgrid = require('sendgrid')('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');
		
/***********************************************
Email for Contact Us message 
***********************************************/
//Called on contact us submission at /api/contactUs via POST


exports.postContactMessage = function (req, res) {

	console.log("Web message API hit with the following details: " + req.body.username + ", " + req.body.useremail + ", " + req.body.subject + ", " + req.body.message);

	if(!req.body.username || !req.body.useremail || !req.body.subject || !req.body.message)  {
		console.log("there seems to be a missing field in the web message!");
		res.json({ message: 'Missing field. Please provide all details.' });
		return;
	}	



	var resp = "";


	for( var i=0; i<contact_ID.length; i++)
	{
		var email = new sendgrid.Email({
			to: contact_ID[i],
			from: 'contact@vahanalytics.com',
			subject: 'New Web Message',
			html: ( "<head><title>New Message!</title></head><body><h2>New message with the following details received:</h2> <h3><p>Name: </h3>" + req.body.username +  "</p>  <h3><p>Email ID: </h3> " + req.body.useremail + ",</p>  <h3><p> Subject: </h3> " + req.body.subject + ",</p>  <h3><p> Message: </h3> " + req.body.message + " </p> </body>" ),
		});

	sendgrid.send(email, function(err, json) {
		if(err) {
			console.log()
			res.json({ message: 'Error while sending email'});
			return;
		}
		else {
		resp = resp + "\n " + JSON.stringify(json);
		console.log("Message got from sendgrid for email: " + resp);
		res.json({ success: 'Email sent successfully'});
		}
	});
	}//for loop ends

	// res.json({ success: 'Email sent successfully'});
	return;
}
		
/***********************************************
New user signup email function to send email
***********************************************/
//Called from user controller on /api/signup via POST


/*exports.welcomeNewUser = function (user) {
//send email to welcome new users
console.log("Booking Controller calling the welcomeNewUser function of emailService with user object");

	
	var resp = "";


	for( var i=0; i<IDs.length; i++)
	{
		var email = new sendgrid.Email({
			to: 'shivalik@bedriven.in',//IDs[i],
			from: 'support@bedriven.in',
			subject: 'New booking',
			html: ( ' <head><meta name="viewport" content="width=device-width" /><meta http-equiv="Content-Type" content="text/html; charset=UTF-8" /><title>Driven</title><style type="text/css">img {max-width: 100%;}body {-webkit-font-smoothing: antialiased; -webkit-text-size-adjust: none; width: 100% !important; height: 100%; line-height: 1.6em;}body {background-color: #f6f6f6;}@media only screen and (max-width: 640px) {  body {    padding: 0 !important;  }  h1 {    font-weight: 800 !important; margin: 20px 0 5px !important;  }  h2 {    font-weight: 800 !important; margin: 20px 0 5px !important;  }  h3 {    font-weight: 800 !important; margin: 20px 0 5px !important;  }  h4 {    font-weight: 800 !important; margin: 20px 0 5px !important;  }  h1 {    font-size: 22px !important;  }  h2 {    font-size: 18px !important;  }  h3 {    font-size: 16px !important;  }  .container {    padding: 0 !important; width: 100% !important;  }  .content {    padding: 0 !important;  }  .content-wrap {    padding: 10px !important;  }  .invoice {    width: 100% !important;  }}</style></head><body itemscope itemtype="http://schema.org/EmailMessage" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; -webkit-font-smoothing: antialiased; -webkit-text-size-adjust: none; width: 100% !important; height: 100%; line-height: 1.6em; background-color: #f6f6f6; margin: 0;" bgcolor="#f6f6f6"><table class="body-wrap" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; width: 100%; background-color: #71A4EF; margin: 0;" bgcolor="#f6f6f6"><tr style="font-family: 'Source Sans Pro',Helvetica Neue,Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;"><td style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0;" valign="top"></td><td class="container" width="600" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; display: block !important; max-width: 600px !important; clear: both !important; margin: 0 auto;" valign="top"><div class="content" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; max-width: 600px; display: block; margin: 0 auto; padding: 20px;"><table class="main" width="100%" cellpadding="0" cellspacing="0" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; border-radius: 3px; background-color: #FFF; margin: 0; border: 1px solid #e9e9e9;" bgcolor="#fff"><tr style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;"><td class="content-wrap aligncenter" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; text-align: center; margin: 0; padding: 0px;" align="center" valign="top"><table width="100%" cellpadding="0" cellspacing="0" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;">                 <tr style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; background-color: #efefef;">                    <td class="content-block" valign="top">                        <h1 class="aligncenter" style="font-family: 'Helvetica Neue',Helvetica,Arial,'Lucida Grande',sans-serif; box-sizing: border-box; font-size: 22px; color: #1d1d1d; line-height: 30px; font-weight: 400; text-align: center; margin: 30 0 0; padding-top: 10px;" align="center">WATCH OUT FOR US TOMORROW!                          <h2 class="aligncenter" style="font-family: sans-serif; box-sizing: border-box; font-size: 14px; color: #5d5d5d; line-height: 20px; font-weight: 400; text-align: center; margin: 10 10 10 10 ; padding-bottom: 10px;" align="center"> Come by our kiosk and say hey @ the Entrance Lobby, 8:30 AM onwards </h2>                        </h1>                    </td>                </tr>                <tr style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;"><td class="content-block" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0; padding: 0 0 20px;" valign="top">                      <h1 class="aligncenter" style="font-family: 'Helvetica Neue',Helvetica,Arial,'Lucida Grande',sans-serif; box-sizing: border-box; font-size: 32px; color: #000; line-height: 1.2em; font-weight: 500; text-align: center; margin: 0 0 0;" align="center">                      <div class="driven_image" style="text-align: center; margin-top: 20px; float: left; position: relative; left: 100px">                      <img src="https://lh3.googleusercontent.com/ovxVuL3dG94LGK9Vve0EKHIeY5QmgckSDjTpNwugdv_QLdV44bbzamkzdB28m0RBmfM=w300-rw" width="100" height="100" />                      </div>                      <h1 class="aligncenter" style="font-family: 'Source Sans Pro', 'Helvetica Neue',Helvetica,Arial,'Lucida Grande',sans-serif; box-sizing: border-box; font-size: 60px; color: #71A4EF; line-height: 0px; font-weight: 500; text-align: center; position: relative; top: 30px; right: 20px;" align="center" valign="center">DRIVEN</h1>                      </h1>                </td>                </tr><!--                 <tr style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;">                <td class="content-block" style="font-family: 'Source Sans Pro',Helvetica Neue,Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0; padding: 0 0 20px;" valign="top">                    <h1 class="aligncenter" style="font-family: 'Source Sans Pro', 'Helvetica Neue',Helvetica,Arial,'Lucida Grande',sans-serif; box-sizing: border-box; font-size: 50px; color: #71A4EF; line-height: 0px; font-weight: 500; text-align: center;" align="center">DRIVEN</h1>                </td>                </tr> -->                               <tr style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0; background-color: #ffffff">                <td class="content-block" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0; padding: 10px 0 20px; border-style: dotted; border-width: 0px 0px 1px 0px; border-color: #afafaf" valign="top">                  <h1 class="aligncenter" style="font-family: 'Helvetica Neue', Helvetica, sans-serif; box-sizing: border-box; font-size: 35px; color: #5a5a5a; line-height: 35px; font-weight: 600; text-align: center; margin: 10px 0 0; padding-left: 20px; padding-right: 20px; " align="center">Your car, our DRIVER</h1>                  <h2 class="aligncenter" style="font-family: 'Helvetica Neue',Helvetica,Arial,'Lucida Grande',sans-serif; box-sizing: border-box; font-size: 15px; color: #2f2f2f; line-height: 20px; font-weight: 400; text-align: justify; margin: 20px 0 0; padding-left: 20px; padding-right: 20px; " align="center"><b>Driven</b> is a BITS-Pilani alumni founded startup trying to solve the pains of using your personal car in urban India by making it easy to find a reliable, affordable, temporary driver around you. Now forget about traffic and parking issues and sit back while we drive you – anytime, anywhere!</h2>                </td>                </tr>                  <tr style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;"><td class="content-block" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0; padding: 0 0 20px;" valign="top">                    <h2 class="aligncenter" style="font-family: 'Helvetica Neue',Helvetica,Arial,'Lucida Grande',sans-serif; box-sizing: border-box; font-size: 26px; color: #5a5a5a; line-height: 1.2em; font-weight: 500; text-align: center; margin: 40px 20px 0;" align="center">How DRIVEN works</h2>                  </td>                  </tr>                  <tr style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;">                  <td class="content-block" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0; padding: 0 0 20px; border-bottom-style: dotted; border-bottom-width: 1px; border-bottom-color: #afafaf;" valign="top">                    <h2 class="aligncenter" style="font-family: 'Helvetica Neue',Helvetica,Arial,'Lucida Grande',sans-serif; box-sizing: border-box; font-size: 15px; color: #000; line-height: 30px; font-weight: 400; text-align: left; margin: 0 20px 0; float: left; display: inline-block; width: 220px; margin-top: 10px;" align="center">                    <ol>                      <li>Use the <b>DRIVEN app</b> to simply choose your pickup details (location, date, time)</li>                      <p></p>                      <li>Once you <b>confirm details</b>, your driver’s info is sent to you via SMS</li>                      <p></p>                      <li><b>Driver arrives</b> at your doorstep! Sit back & relax while he drives you through the city</li>                      <p></p>                    </ol>                    </h2>                  <div class="driven_image" style="text-align: center; display: inline-block; float: right; margin-top: 20px">                    <img src="http://gdurl.com/7xFk" width="280" />                  </div>                  </td>                  </tr>                  <tr style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;"><td class="content-block" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0; padding: 0 0 20px;" valign="top">                    <h2 class="aligncenter" style="font-family: 'Helvetica Neue',Helvetica,Arial,'Lucida Grande',sans-serif; box-sizing: border-box; font-size: 15px; color: #000; line-height: 1.2em; font-weight: 400; text-align: justify; margin: 0 0 0;" align="center">                    </h2>                  </td>                  </tr><tr style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;"><td class="content-block" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0; padding: 0 0 20px;" valign="top">                    <h2 class="aligncenter" style="font-family: 'Helvetica Neue',Helvetica,Arial,'Lucida Grande',sans-serif; box-sizing: border-box; font-size: 26px; color: #5a5a5a; line-height: 1.2em; font-weight: 500; text-align: center; margin: 20px 20px 0;" align="center">How much it costs</h2>                  </td>                  </tr>                  <tr style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;"><td class="content-block" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0; padding: 0 0 20px;" valign="top">                    <h2 class="aligncenter" style="font-family: 'Helvetica Neue',Helvetica,Arial,'Lucida Grande',sans-serif; box-sizing: border-box; font-size: 15px; color: #000; line-height: 1.2em; font-weight: 400; text-align: left; margin: 0 20px 0px; padding-bottom: 20px; border-bottom-style: dotted; border-bottom-color: #afafaf; border-bottom-width: 1px;" align="center">                    <ul>                      <p style="font-size: 22px; color: #5a5a5a; line-height: 30px;">Pay hourly for what you use @ <b>just Rs.99/hour</b>! <span style="font-size: 18px; color: #5a5a5a; line-height: 20px;">For the detailed fare chart, check out our app or visit our website</span></p>                        <p style="font-size: 14px; color: #7f7f7f; line-height: 10px;">*We offer special <b>office commute subscriptions</b> to ease the burden of peak hour travel</p>                      <p style="font-size: 14px; color: #7f7f7f; line-height: 10px;">*We also offer <b>outstation trip deals</b> on a case-to-case basis. <b>Contact us</b> for more info!</p>                    </ul></h2>                  </td></tr><tr style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;"><td class="content-block aligncenter" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; text-align: center; margin: 0; padding: 0 0 20px;" align="center" valign="top"><a href="http://goo.gl/hWmir3" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; color: #348eda; text-decoration: underline; margin: 0;">Visit our website!</a></td>                  <tr style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;"><td class="content-block" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0; padding: 0 0 20px;" valign="top">                    <h2 class="aligncenter" style="font-family: 'Helvetica Neue',Helvetica,Arial,'Lucida Grande',sans-serif; box-sizing: border-box; font-size: 15px; color: #000; line-height: 1.2em; font-weight: 400; text-align: justify; margin: 0 0 0;" align="center"><div class="driven_image" style="text-align: center;">                      <a href="https://goo.gl/51cgkZ"><img src="http://static1.squarespace.com/static/5109335ae4b04ea0ec18c6b9/t/5255bec1e4b006abe8bb5821/1381351107444/GooglePlay_appStore.png " width="150"/>                      <a href="https://goo.gl/EZNnZs"><img src="http://www.dosgringosmedia.com/wp-content/uploads/2015/03/download-on-app-store-png.png " width="150"/>                    </div>                    </h2>                  </td>                  </tr>                  <tr style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;"><td class="content-block aligncenter" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; text-align: center; margin: 0; padding: 0 0 20px;" align="center" valign="top">                    Get Rs.200 OFF on your first ride when you when you download the app and use the code <b>EASY200</b>!                  </td></tr></table></td></tr></table><div class="footer" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; width: 100%; clear: both; color: #999; margin: 0; padding: 20px;"><table width="100%" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;"><tr style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;"><td class="aligncenter content-block" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 12px; vertical-align: top; color: #ffffff; text-align: center; margin: 0; padding: 0 0 20px;" align="center" valign="top">Contact Us<br/>For enquiries or booking requests, call our customer support team on 022-30770169 or write to us at <a href="mailto:" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 12px; color: #ffffff; text-decoration: underline; margin: 0;">support@bedriven.in</a></td></tr><tr style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;"><td class="content-block aligncenter" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; text-align: center; margin: 0; padding: 0 0 20px; color: #cfcfcf" align="center" valign="top">© UrbTranz Tech, 2016</td></tr></table></div></div></td><td style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0;" valign="top"></td></tr></table></body>' ),
	});

	sendgrid.send(email, function(err,json) {
		if(err)
			return (err);
		
		else {
		resp = resp + "\n " + JSON.stringify(json);
		console.log("Message got from sendgrid for email: " + resp);
		}
	});
	}//for loop ends

return (resp);
};*/

		
/***********************************************
User canceling booking email function to send email
***********************************************/
//Called from booking controller on /api/postCancelBooking via POST


/*
exports.cancelBooking = function (book, user) {
	//send email to us as well as to user about booking cancellation
	console.log("Booking Controller calling the cancelBooking function of emailService with booking and user objects");
	
	var resp = "";


for( var i=0; i<IDs.length; i++)
{
	var email = new sendgrid.Email({
		to: IDs[i],
		from: 'support@bedriven.in',
		subject: 'Booking canceled',
		html: ( "<head><title>Booking Canceled!</title></head><body><h2> Cancellation request of booking with the following details received:</h2> <h3><p>Booking ID:</h3>" + book.booking_id +  "</p>  <h3><p>User ID: </h3> " + book.user_id + ",</p>  <h3><p> Name: </h3> " + user.username + ",</p>  <h3><p> Number: </h3> " + user.number + ", </p> <h3> <p> Latitude: </h3> " + book.pickup_lat + ", </p>  <h3><p>Longitude: </h3> " + book.pickup_long  + ", </p>  <h3><p> Address: </h3> " + book.address+ ", </p>  <h3><p> Date of Trip: </h3> " + book.date_of_trip + ", </p>  <h3><p> Coupon code:</h3>  " + book.coupon_applied + ", </p>  <h3><p> Discount:</h3>  " + book.discount + ", </p> <h3> <p> Time of Trip:</h3>  " + book.time_of_trip + ". </p> <h3> <p> The booking was received at:</h3>  " + book.time_of_booking + ",</p> <h3> <p> The booking was received from: </h3> " + book.device + ", running:</h3> " + book.os +" </body>" ),
		
		});


	sendgrid.send(email, function(err,json) {
		if(err)
			return (err);
		
		else {
		resp = resp + "\n " + JSON.stringify(json);
		console.log("Message got from sendgrid for email: " + resp);
		}

	});
}//for loop ends
return (resp);
};
*/