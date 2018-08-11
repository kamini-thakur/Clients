$(function() {

              function saveFormValues() {
                var formValues = {
                  CalorieGender: $('input[name=CalorieGender]:checked').val(),
                  weight: $('input[name=weight]').val() == '' ? $('input[name=weight]').attr('placeholder') : $('input[name=weight]').val(),
                  height: $('input[name=height]').val() == '' ? $('input[name=height]').attr('placeholder') : $('input[name=height]').val(),
                  age: $('input[name=age]').val() == '' ? $('input[name=age]').attr('placeholder') : $('input[name=age]').val(),
                  activityLevel: $('input[name=activityLevel]').val() == '' ? $('input[name=activityLevel]').attr('placeholder') : $('input[name=activityLevel]').val(),
                  calorieDeficitPercent: $('input[name=calorieDeficitPercent]').val() == '' ? $('input[name=calorieDeficitPercent]').attr('placeholder') : $('input[name=calorieDeficitPercent]').val(),
                  fatMuscle: $('input[name=fatMuscle]:checked').val(),
                  bodyFatGender: $('input[name=bodyFatGender]:checked').val(),
                  waistSize: $('input[name=waistSize]').val() == '' ? $('input[name=waistSize]').attr('placeholder') : $('input[name=waistSize]').val(),
                  hipSize: $('input[name=hipSize]').val() == '' ? $('input[name=hipSize]').attr('placeholder') : $('input[name=hipSize]').val(),
                  neck: $('input[name=neck]').val() == '' ? $('input[name=neck]').attr('placeholder') : $('input[name=neck]').val(),
                  forarm: $('input[name=forarm]').val() == '' ? $('input[name=forarm]').attr('placeholder') : $('input[name=forarm]').val(),
                  wrist: $('input[name=wrist]').val() == '' ? $('input[name=wrist]').attr('placeholder') : $('input[name=wrist]').val(),
                  bodyFatWt: $('input[name=bodyFatWt]').val() == '' ? $('input[name=bodyFatWt]').attr('placeholder') : $('input[name=bodyFatWt]').val(),
                  bodyFatHt: $('input[name=bodyFatHt]').val() == '' ? $('input[name=bodyFatHt]').attr('placeholder') : $('input[name=bodyFatHt]').val(),
                  macronutrientGender: $('input[name=macronutrientGender]:checked').val(),
                  bodyFatCalculated: $('.bodyFatCalculated').val() == '' ? $('.bodyFatCalculated').attr('placeholder') : $('.bodyFatCalculated').val(),
                  macronutrientWt: $('input[name=macronutrientWt]').val() == '' ? $('input[name=macronutrientWt]').attr('placeholder') : $('input[name=macronutrientWt]').val(),
                  fat: $('input[name=fatPercent]').val() == '' ? $('input[name=fatPercent]').attr('placeholder') : $('input[name=fatPercent]').val(),
                  carbs: $('input[name=carbsPercent]').val() == '' ? $('input[name=carbsPercent]').attr('placeholder') : $('input[name=carbsPercent]').val(),
                  proteinIntake: $('input[name=proteinIntake]').val() == '' ? $('input[name=proteinIntake]').attr('placeholder') : $('input[name=proteinIntake]').val(),
                  totalCalorieGoal: $('input[name=totalCalorieGoal]').val() == '' ? $('input[name=totalCalorieGoal]').attr('placeholder') : $('input[name=totalCalorieGoal]').val(),
                }
                return formValues;
              }
  
              function IsNumeric(event) { 
                  var keyCode = event.which ? event.which : event.keyCode;
                  var ret = ((keyCode >= 48 && keyCode <= 57 ) || specialKeys.indexOf(keyCode) != -1);
                  return ret;
              }

              function recalc() { 
                
                var formValues = saveFormValues();
                var age = Number(formValues.age),
                    height = Number(formValues.height)*0.394,
                    CalorieGender = formValues.CalorieGender,
                    weight = Number(formValues.weight)*2.205,
                    activityLevel = Number(formValues.activityLevel),
                    calorieDeficitPercent = Number(formValues.calorieDeficitPercent),
               		fatMuscle = formValues.fatMuscle;
                  
                if (CalorieGender == 'male') { 
                  var BMR = Math.round(66+(13.7*weight)+(5*height)-(6.8*age));
                }
                else {  
                  var BMR = Math.round(655+(9.6*weight)+(1.7*height)-(4.7*age));
                }

                var TDEE = Math.round(activityLevel*BMR);
                var calorieDeficit = Math.round((calorieDeficitPercent/100)*TDEE);
                $('.calorieDeficitTotal').val(calorieDeficit);
                
                if (fatMuscle == 'FatLoss') { 
                  var caloriesGoal = TDEE-calorieDeficit;
                  $('.fat-loss').css('display','block');
                  $('.muscle-gain').css('display','none');
                }
                else { 
                  var caloriesGoal = TDEE+calorieDeficit;
                  $('.fat-loss').css('display','none');
                  $('.muscle-gain').css('display','block');
                }
                
                $('.calcBMR').text(BMR+" calories");
                $('.maintenanceTDEE').text(TDEE+" calories");
                $('.totalCaloriesGoal').text(caloriesGoal);
                $('.totalCalorieGoal').val(caloriesGoal);
                macronutrientRecalc();
              }
  
  			  function recalcBodyFat()
              { 
                var formValues = saveFormValues();
                var bodyFatGender = formValues.bodyFatGender,
                    waistSize = Number(formValues.waistSize)*0.394,
                    hipSize = Number(formValues.hipSize)*0.394,
                    neck = Number(formValues.neck)*0.394,
                    forarm = Number(formValues.forarm)*0.394,
                    wrist = Number(formValues.wrist)*0.394,
               		bodyFatWt = Number(formValues.bodyFatWt)*2.205,
                	bodyFatHt = Number(formValues.bodyFatHt)*0.394;
                
                if (bodyFatGender == 'male') { 
                  var bodyFatPercent = (86.010 * Math.log10(waistSize - neck)) - (70.041 * Math.log10(bodyFatHt)) + 36.76;
                }
                else {  
                  var bodyFatPercent = (163.205 * Math.log10(waistSize + hipSize - neck)) - (97.684 * Math.log10(bodyFatHt)) - 78.387;
                }
                
                $('.bodyFatPercent').text(bodyFatPercent.toFixed(2));
                $('.bodyFatCalculated').attr('placeholder',bodyFatPercent.toFixed(2));
                macronutrientRecalc();
                $('.tab3').removeClass('disabled');
              }
              function macronutrientRecalc()
              {
                $('.macronutrientCalc').removeClass('active');
                $(this).addClass('active');
                                   
                var formValues = saveFormValues();	
                var macronutrientGender = formValues.macronutrientGender,
                    macronutrientWt = Number(formValues.macronutrientWt),
                    bodyFatPercent = Number(formValues.bodyFatCalculated),
                    fatPercent = Number(formValues.fat),
                    carbsPercent = Number(formValues.carbs),
                    proteinIntake = Number(formValues.proteinIntake),
                	totalCalorieGoal = Number(formValues.totalCalorieGoal);
                
                var LBM = Math.round(macronutrientWt-((bodyFatPercent/100)*macronutrientWt));
                $('.LBMcalculated').text(LBM);
                var proteinGrams = Math.round((LBM)*(proteinIntake)); $('.proteinGrams').text(proteinGrams);
                var proteinCalories = Math.round(proteinGrams*4); $('.proteinCalories').text(proteinCalories);
                
                var proteinPercent = Math.round((proteinCalories/totalCalorieGoal)*100);
                console.log('proteinPercent'+proteinPercent);
                $('.proteinPercent').text(proteinPercent);
                  
                if($('.fatPercent').hasClass('active'))
                {  
                  var carbsPercentChanged = Math.round(proteinPercent)+Math.round(fatPercent); 
                  carbsPercent = 100-carbsPercentChanged;
                  if(carbsPercent >= 0)
                  {            
                    $('.carbsPercent').attr('placeholder',carbsPercent);
                    $('.carbsPercent').val(carbsPercent);
                  }
                  else
                  { 
                    var carbsPercent = 0; var fatPercent = 100-proteinPercent;
                    $('.carbsPercent').attr('placeholder',carbsPercent);
                    $('.carbsPercent').val(carbsPercent);
                    
                    $('.fatPercent').attr('placeholder',fatPercent);
                    $('.fatPercent').val(fatPercent);
                  }
                }
                if($('.carbsPercent').hasClass('active'))
                { 
                  var fatPercentChanged = Math.round(proteinPercent)+Math.round(carbsPercent);
                  fatPercent = 100-fatPercentChanged;
                  if(fatPercent >= 0)
                  {
                    $('.fatPercent').attr('placeholder',fatPercent);
                    $('.fatPercent').val(fatPercent);
                  }
                  else
                  {
                    var fatPercent = 0; var carbsPercentNew = 100-proteinPercent;
                    $('.carbsPercent').attr('placeholder',carbsPercentNew);
                    $('.carbsPercent').val(carbsPercentNew);
                    
                    $('.fatPercent').attr('placeholder',fatPercent);
                    $('.fatPercent').val(fatPercent);
                  } 
                }
                if(!$('.fatPercent').hasClass('active') && !$('.carbsPercent').hasClass('active'))
                { 
                  var fatPercent = 100-(Math.round(carbsPercent)+Math.round(proteinPercent));
                  
                  $('.fatPercent').attr('placeholder',fatPercent);
                  $('.fatPercent').val(fatPercent);
                }  
                var fatCalories = Math.round((fatPercent/100)*totalCalorieGoal);
                $('.fatCalories').text(fatCalories);
               
                var carbsCalories = Math.round((carbsPercent/100)*totalCalorieGoal);
                console.log('carbsPercent'+carbsPercent+'carbsCalories'+carbsCalories);
                $('.carbsCalories').text(carbsCalories);
                
                var fatGrams = Math.round(fatCalories/9); $('.fatGrams').text(fatGrams);
                var carbsGrams = Math.round(carbsCalories/4); $('.carbsGrams').text(carbsGrams);
               
                $('.fatGramCalc').text(fatGrams);
                $('.carbsGramCalc').text(carbsGrams);
                $('.proteinGramCalc').text(proteinGrams);
              }
  
              $(".calc, .calcBodyFat, .macronutrientCalc").on('keypress', function(e) {
                var isNumeric = IsNumeric(e); 
                var changeStyle = isNumeric ? "2px solid #e1e1dd" : "1px solid red";  
                $(this).css('border',changeStyle);
                
                if($(this).hasClass('Percent'))
                {
                  	  var maxLen =  2;
                      var Length = $(this).val().length; 
                      if(Length >= maxLen){
                        if (e.which != 8) { 
                          return false;
                        }
                      }
                }
//                 if($(this).hasClass('totalCalorieGoal'))
//                 {
//                       var minLen =  3;
//                       var Length = $(this).val().length; 
//                       if(Length < minLen){
//                         if (e.which != 8) { 
//                               return false;
//                         }
//                       }
//                   	  var totalCalorieGoal = $(this).val();
//                   	  if(totalCalorieGoal < 1500)
//                       {
//                          $('.totalCalorieGoal').val(1500);
//                       }
//                 }
  
                return isNumeric;
              });
             
  			  $('.calc').on('change', recalc);
              $('.calc').on('keyup', recalc);
  			  $('.calcBodyFat').on('change', recalcBodyFat);
			  $('.calcBodyFat').on('keyup', recalcBodyFat);
  			  $('.macronutrientCalc').on('change', macronutrientRecalc);
  			  $('.macronutrientCalc').on('keyup', macronutrientRecalc);
  			  
              recalc();
			  recalcBodyFat();
  			  macronutrientRecalc();
  
  			  var specialKeys = new Array();
              specialKeys.push(8); //Backspace
  			  specialKeys.push(46); // Decimal point
  
  
  	 $('.calorieCalc').click(function(e){
        $('.tabs .tab-links a[href="#tab1"]').trigger('click');
     });
 	 $('.CalorieCalc').click(function(e){
        $('.tabs .tab-links a[href="#tab1"]').trigger('click');
     });
  	 $('.bodyfatCalc').click(function(e){
        $('.tabs .tab-links a[href="#tab2"]').trigger('click');
     });

});

=======================

macronutrient intake change for total calorie caloriesGoal for textbox to make it editable

<td class="MacroTotalCalorieGoal"><input type="number" name="totalCalorieGoal" class="macronutrientCalc totalCalorieGoal" placeholder="1925"></td>


=========================

<div class="affiliate">
<div class="para1">
<h3>"WHITE LABELING" FOR SEO &amp; MARKETING FIRMS</h3>
<div class="divider"><img src="https://cdn.shopify.com/s/files/1/0002/9265/1059/files/divider.png?15469029015764736876" /></div>
<p>Our "white-labeled" option allows you to sell our blogging service to your clients as if it were your service. You put your branding on the service, and you set the price you want to charge your clients. We do all the work and only communicate with you, so your clients never know we're involved. You pocket the difference between what you choose to charge your clients and the 20%-discounted wholesale rates you get from us. It's a WIN-WIN for both you and your clients. You earn a lot of money, skip out on all the work, and have happy clients. Your clients get high-quality unique content written by talented American writers automatically posted to their blog or website, resulting in all kinds of SEO benefits. Here's a brief overview of how the "white labeling" service works, why it's good for you, and why it's good for your clients...</p>
</div>
<div class="para2">
<h3>Does White Labeling Make More Sense For You?</h3>
<div class="divider"><img src="https://cdn.shopify.com/s/files/1/0002/9265/1059/files/divider.png?15469029015764736876" /></div>
<p>Are you an SEO firm or an online marketing agency interested in "white labeling" our service (i.e. selling it to your clients as if it were your service, and then "outsourcing" the blogging work to us)? Check out our White Label option, which gives you 20% wholesale discounts. (Please note that you may not get 20% wholesale discounts and also earn affiliate commissions on the same clients; you may only get one or the other.)</p>
</div>
<div class="para3">
<h3>HOW IT WORKS</h3>
<div class="divider"><img src="https://cdn.shopify.com/s/files/1/0002/9265/1059/files/divider.png?15469029015764736876" /></div>
<ul>
<li>You pitch the blogging service to your clients as if it's your service</li>
<li>You charge your clients any amount you want (many of our partners are charging as much as 200% our standard prices)</li>
<li>You outsource the actual blogging work to us at a special wholesale rate (20% less than our published rates)</li>
<li>We communicate only with you (never with your client) &amp; we never put "My Blog Squad" branding on any of our work</li>
<li>Your client never knows we're involved</li>
<li>You make a lot of money, get all the credit &amp; have happy clients :-)</li>
</ul>
</div>
<div class="para4">
<h3>WHAT YOU GET</h3>
<div class="divider"><img src="https://cdn.shopify.com/s/files/1/0002/9265/1059/files/divider.png?15469029015764736876" /></div>
<ul>
<li>20%-discounted <strong>wholesale pricing</strong> with the freedom to charge your clients any rate your choose</li>
<li>Access to an expert staff of talented American writers <strong>without</strong> having to manage them</li>
<li>Streamlined service to make your life easier, including topic idea generation and even logging in and posting blog entries (all for no extra charge)</li>
<li>Happy clients reaping huge SEO benefits with powerful on-site optimization</li>
<li><strong>All the credit</strong> - with our white-label service, you can name and manage the program under your own label</li>
</ul>
</div>
<div class="para5">
<h3>YOUR THE CLIENT GETS</h3>
<div class="divider"><img src="https://cdn.shopify.com/s/files/1/0002/9265/1059/files/divider.png?15469029015764736876" /></div>
<ul>
<li>Top-quality blog posts that are thoroughly researched and written from scratch by professional American writers</li>
<li><strong>SEO Results</strong> - better rankings, more direct traffic for "long-tail" keyword phrases, more internal page &amp; links, and a social hub for creating a social following - see <a href="/pages/benefits" target="_blank" rel="noopener noreferrer">Benefits</a> page</li>
<li>Effortless content creation - we research each client's market/niche to come up with topics that will appeal to their target audience</li>
<li>The option to have blog entries OR articles <strong>automatically posted</strong> to their blog or website</li>
</ul>
</div>
<div class="para6">
<h3>SET-UP PROCESS</h3>
<div class="divider"><img src="https://cdn.shopify.com/s/files/1/0002/9265/1059/files/divider.png?15469029015764736876" /></div>
<ul>
<li>Sign up (at wholesale rates) for the plan you/your client wants: <strong>Lite</strong> (1 post/week), <strong>Standard</strong> (2 posts/week) or <strong>Extreme</strong> (3 posts/week)</li>
<li>If you don't already have it, collect information from your client (blog/site login credentials, instructions for content, list of sources, etc.)</li>
<li>Pass the information on to us by filling out the 'Information Request Form' (which you'll be sent automatically when you sign up for a plan)</li>
<li>That's it - that's the extent of your involvement - we take it from here!</li>
</ul>
</div>
<div class="para7">
<h3>ONGOING MONTHLY SERVICE</h3>
<div class="divider"><img src="https://cdn.shopify.com/s/files/1/0002/9265/1059/files/divider.png?15469029015764736876" /></div>
<ul>
<li>Using the input/instructions you provided, we come up with all topic ideas on an ongoing basis (you can of course give input along the way)</li>
<li>Our talented American writing team writes 400+ word blog entries/articles from scratch (no copying/pasting and no "spinning")</li>
<li>We will even log in and post the blog entries/articles on your client's site (or, if you'd prefer, we can email the content to you instead)</li>
<li>You may cancel the service at any time (it's month-to-month with no long-term commitment)</li>
</ul>
</div>
<div class="para8">
<h3>Ready to Get Started?</h3>
<div class="divider"><img src="https://cdn.shopify.com/s/files/1/0002/9265/1059/files/divider.png?15469029015764736876" /></div>
<p class="last-para">Please fill out this short inquiry form to tell us about your company and how you intend to use our service. We'll get back to you shortly with information about how to access the 20% discounted wholesale pricing and get started with "white labeling" our blogging service:</p>
</div>
</div>