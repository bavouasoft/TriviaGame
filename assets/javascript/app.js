var slide = setInterval(execSlide, 5000);
let i = 0;
var results = new Map();

function execSlide() {
  console.log(i);

  if (i < questions.length) {
    var qst = questions[i];
    renderQuestion(qst);
    //document.getElementById("area").innerHTML = qst.id + '-' + qst.title
    registerEvent();
  } else if ((i = questions.length)) {
    let res = publishResult();
    document.getElementById("area").innerHTML =
      '<span class="blink">Game over</span><br/><br/>' + res;

    stopSlide();
  }

  i++;
}

function stopSlide() {
  clearInterval(slide);
}

renderQuestion = function (question) {
  // $("#area")
  var content = generateQstHtml(question);
  $("#area").html(content);
};

generateQstHtml = function (question) {
  // <div class="qst" id="">
  //      <div class="titleQst"></div>
  //      <div class="QstItem">
  //
  //      </div>
  // </div>

  var qstid = question.id;
  var title = question.title;
  var ismult = question.ismult;
  var choices = question.choices;
  var choicesTxt = generateQstChoices(qstid, choices, ismult);

  var resp = `   
        <div class=\"qst\" id=\"${qstid}\">  
               <div class=\"titleQst\">${title}</div>  
               <div class=\"QstItem\">  
              ${choicesTxt}
              </div> 
        </div>
        `;

  return resp;
};

generateQstChoices = function (idQst, choices, ismult) {
  var allChoices = "";

  var choice;

  for (choice of choices) {
    allChoices =
      allChoices +
      generateInputItem(
        idQst,
        choice.ord,
        choice.resp,
        choice.isRightResp,
        ismult
      );
  }
  return allChoices;
};

generateInputItem = function (idparent, ord, choiceTxt, is_rightresp, ismult) {
  //<div>
  //    <input type="radio" id="dewey" name="drone" value="dewey">
  //        <label for="dewey">Dewey</label>
  //</div>
  /*
    var res = 
        "<div>" +
        "<input type=\"radio\" id=\"`${idparent +'.'+ ord}`\" name=\"`${ord}`\" value=\"`${idparent +'.'+ ord}`\"> "     +
        "<label for=\"`${idparent +'.'+ ord}`\">`${choiceTxt}`</label>" +
        "</div>" ;
    */

  var type = ismult ? "checkbox" : "radio";
  var ok = is_rightresp ? "true" : "false";

  var res = `
         <div>  
         <input type=\"${type}\" id=\"${
    idparent + "." + ord
  }\" name=\"${idparent}\"  ok=\"${ok}\"  class = \"chk\" value=\"${
    idparent + "." + ord
  }\">       
         <label for=\"${idparent + "." + ord}\">${choiceTxt}</label>  
         </div> 
         `;
  return res;
};

registerEvent = function () {
  $(".chk").change(function () {
    let who = $(this).prop("id");
    handleEvent(this);
    //let checked = $(this).prop('checked') ? 'checked' : 'unchecked';
    //console.log(who + ' has been ' + checked);
  });
};

handleEvent = function (choice) {
  // console.log(component);
  let name = choice.name;
  let id = choice.id;
  let type = choice.type;
  let checked = $(choice).prop("checked") ? true : false;
  let _good = $(choice).attr("ok");
  let good = _good == "true";

  console.log(`${name} ->  ${id} -> ${type} -> ${checked} -> ${good}`);

  if (checked) {
    results.set(id, good);
  } else {
    results.delete(id);
  }
};

publishResult = function () {
  let countGoodAnswer = 0;
  results.forEach(function (value, key) {
    console.log(key + " = " + value);
    if (value == true) {
      countGoodAnswer++;
    }
  });

  let res = ` Your result : ${countGoodAnswer} good responses  over ${questions.length} `;

  return res;
};

<div class="qst" id="">
  {/* <div mode=""></div> */}
  <div mode="Qst">// // </div>{" "}
</div>;
