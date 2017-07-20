"use strict";

$(function(){
	$("#parseBtn").click(function() {
		let i = 0;
		let message = {
			count: [],
			name: [],
			stack: []
		};

		let code = $("#codeInputArea").val();
		let length = code.length;//Getting the lenght of the code

		let finded = code.indexOf('div class="im-page--chat-body-wrap-inner-2"');//Finding position of the Main Message Block
		let HtmlTags = code.indexOf('</body>');//Finding position of the closing body, html tags

		let messageBlock = code.substring(finded, HtmlTags);//Message block

		$("#buffer").append(messageBlock);//Injecting the Message block into the buffer
		/*------------------------------------------------------------------------------------*/
		let messageName = $(".im-mess-stack--lnk:not(ul .im-mess-stack--lnk)");//Name class
		let messageStack = $(".ui_clean_list.im-mess-stack--mess._im_stack_messages:not(.media_desc.im-mess--inline-fwd .ui_clean_list.im-mess-stack--mess._im_stack_messages)");//Message stack class
		let messageLi = $(".ui_clean_list.im-mess-stack--mess._im_stack_messages:not(.media_desc.im-mess--inline-fwd .ui_clean_list.im-mess-stack--mess._im_stack_messages) li");

		messageName.each(function(index) {
			message.name.push($(this).text());
			message.count.push(index);
		});

		messageStack.each(function(index) {
			message.stack.push($(this).text());
		});
		
		//$("#ultimateMessageBlock").css("display", "block");

		$(".mesCount").text(message.count.length);

		for (i = 0; i < message.name.length; i++) {
			$("#mainMessageText").append("<b>" + message.name[i] + "</b>:<br />" + message.stack[i] + "<br /><br />");
		}

	});

	let copyBtn = document.querySelector('#copyBtn');  
	
	copyBtn.addEventListener('click', function(event) {  
  // Выборка ссылки с электронной почтой 
  let mainMessageText = document.querySelector('#mainMessageText');  
  let range = document.createRange();  
  range.selectNode(mainMessageText);  
  window.getSelection().addRange(range);  
    
  try {  
    // Теперь, когда мы выбрали текст ссылки, выполним команду копирования
    let successful = document.execCommand('copy');  
    let msg = successful ? 'successful' : 'unsuccessful';  
    console.log('Copy message text command was ' + msg);  
  } catch(err) {  
    console.log('Oops, unable to copy');  
  }  
    
  // Снятие выделения - ВНИМАНИЕ: вы должны использовать
  // removeRange(range) когда это возможно
  window.getSelection().removeAllRanges();  
	});

});


//media_desc im-mess--inline-fwd - forwarded