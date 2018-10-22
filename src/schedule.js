var xhr=null;
var x_data = new Array();//Данные из запроса
var spec = new Array(); //Массив специальностей
var gr_number = new Array(); //Номера групп
var fio = new Array(); //Фамилии преподавателей
var bld = new Array(); //Здания


function createRequest(){
	try {
	xhr = new XMLHttpRequest();
	}
	catch (e) {
	      try {
		  xhr = new ActiveXObject("Msxml2.XMLHTTP");
		  }
		    catch (ee) {
			      try {
				  xhr = new ActiveXObject("Microsoft.XMLHTTP");
				  }
				  catch(eee) {
				     xhr=null;
				  }				 
			}
	}	

}

/*
function createRequest(){
	xhr = new XMLHttpRequest();	
	}
*/

//Выбрали курс
function on_course_change() {
	var s1 = document.getElementById('tt_sel1');
	var s2 = document.getElementById('tt_sel2');
	var s3 = document.getElementById('tt_sel3');
	s3.options.length=1;
	var temp = Array();
	var j=0;

for(var i=0; i<x_data.length;i++) {
   if(x_data[i].course==s1.options[s1.selectedIndex].value) {
      if(s2.options[s2.selectedIndex].value!=0)  {
		          if(x_data[i].speciality==s2.options[s2.selectedIndex].value) {
                  temp[j]=x_data[i].number;
                  j++;
				  }				  
		}
       if(s2.options[s2.selectedIndex].value==0)  {
                  temp[j]=x_data[i].number;
                  j++;			  
		}
   }
 }
	temp.sort();
	for(var i=0; i<temp.length;i++) {
	s3.options[i+1] = new Option(temp[i],temp[i]);
	}
}

//Выбрали специальность
function on_spec_change() {

	var s1 = document.getElementById('tt_sel1');
	var s2 = document.getElementById('tt_sel2');
	var s3 = document.getElementById('tt_sel3');
	s3.options.length=1;
	var temp = Array();
	var j=0;

for(var i=0; i<x_data.length;i++) {
   if(x_data[i].speciality==s2.options[s2.selectedIndex].value) {
   
        if(s1.options[s1.selectedIndex].value!=0)  {
		          if(x_data[i].course==s1.options[s1.selectedIndex].value) {
                  temp[j]=x_data[i].number;
                  j++;
				  }				  
		}
		
		if(s1.options[s1.selectedIndex].value==0)  {
		temp[j]=x_data[i].number;
        j++;
		}
   }
 }
	temp.sort();
	for(var i=0; i<temp.length;i++) {
	s3.options[i+1] = new Option(temp[i],temp[i]);
	}
	
}	

//Определились с группой
function on_group_selected() {
var out_file = document.getElementById('idfile');
var title = document.getElementById('idtitle');
var s3 = document.getElementById('tt_sel3');
	for(var i=0; i<x_data.length;i++) {
      if(s3.options[s3.selectedIndex].value==x_data[i].number) {
	  out_file.value = x_data[i].filename;
	  title.value = "Группа "+x_data[i].number +" ("+x_data[i].speciality+", " +x_data[i].course+" курс, "+x_data[i].form+" форма обучения)";
      loadTimetable('');
	  break;
	  }
	}
}

//Определились с преподавателем
function on_lecturer_selected() {
var out_file = document.getElementById('idfile');
var title = document.getElementById('idtitle');
var s_lect = document.getElementById('tt_lect');
	for(var i=0; i<x_data.length;i++) {
      if(s_lect.options[s_lect.selectedIndex].value==x_data[i].name) {
	  out_file.value = x_data[i].filename;
	  title.value = x_data[i].position+" "+ x_data[i].name;
      loadTimetable('');
	  break;
	  }
	}
}

//Определились с корпусом
function on_room_selected() {
var out_file = document.getElementById('idfile');
var title = document.getElementById('idtitle');
var s_room = document.getElementById('tt_room');
	for(var i=0; i<x_data.length;i++) {
      if(s_room.options[s_room.selectedIndex].value==x_data[i].name) {
	  out_file.value = x_data[i].filename;
	  title.value = "Корпус "+ x_data[i].name;
      loadTimetable('');
	  break;
	  }
	}
}

//Нажали на картинку	
function typeSelected(tt_type) {
var s1 = document.getElementById('tt_sel1');
var s2 = document.getElementById('tt_sel2');
var s3 = document.getElementById('tt_sel3');

var s_lect = document.getElementById('tt_lect');
var s_room = document.getElementById('tt_room');

var out_type = document.getElementById('idtype');
var out_file = document.getElementById('idfile');
var title = document.getElementById('idtitle');

title.value="";

s1.style.display = 'none';
s2.style.display = 'none';
s3.style.display = 'none';
s_lect.style.display = 'none';
s_room.style.display = 'none';

switch (tt_type) {
case 'group':
     out_type.value = "group";
	 out_file.value = "";
     createRequest();
	 var url = "/groups/";
	 xhr.open("GET",url,true);
	   xhr.onreadystatechange = function(){
	   if (xhr.readyState == 4) 
			   {
			       if(xhr.status == 200) 
				   {
					 x_data=JSON.parse(xhr.responseText);
					 //Массив специальностей
					 var temp = new Array();
					 for(var i=0; i<x_data.length;i++) {
					 temp[i]=x_data[i].speciality;	
					 }
					 temp.sort();
					 var j=0;
					 spec[0]=temp[0];
					 for(var i=1; i<temp.length;i++) {
						if(spec[j-1]!=temp[i]) {
						spec[j]=temp[i];
						j++;
						}
					 }
					
					 //Номера групп
					 temp.length=0;
					 for(var i=0; i<x_data.length;i++) {
					 gr_number[i]=x_data[i].number;	
					 }
					 gr_number.sort();				
					   
					 //Интерфейс
					 s1.style.display = 'block';
					s1.options[0] = new Option("Выберите курс","0");
					for(var i=1;i<6;i++){
					s1.options[i] = new Option(i,i);
					}
					s2.style.display = 'block';	
					s2.options[0] = new Option("Выберите специальность","0");
					for(var i=0; i<spec.length;i++) {
					s2.options[i+1] = new Option(spec[i],spec[i]);
					}
	
					s3.style.display = 'block';	
					s3.options[0] = new Option("Выберите группу","0");
					for(var i=0; i<gr_number.length;i++) {
					s3.options[i+1] = new Option(gr_number[i],gr_number[i]);
					}	
					s1.selectedindex=0;
					s2.selectedindex=0;
					s3.selectedindex=0;
                   }//if(xhr.status == 200)
                }				
				
};//xhr.onreadystatechange
	   xhr.send(null);	
break;

case 'lecturer':
out_type.value = "lecturer";
out_file.value = "";
createRequest();
var url = "/lecturers/";
	 xhr.open("GET",url,true);
	   xhr.onreadystatechange = function(){
	   if (xhr.readyState == 4) 
			   {
			       if(xhr.status == 200) 
				   {
					 x_data=JSON.parse(xhr.responseText);
					 //Массив фамилий
					 for(var i=0; i<x_data.length;i++) {
					 fio[i]=x_data[i].name;	
					 }
					 fio.sort();
					
					 //Интерфейс
					s_lect.style.display = 'block';
					s_lect.options[0] = new Option("Выберите преподавателя","0");
					for(var i=0;i<fio.length;i++){
					s_lect.options[i+1] = new Option(fio[i],fio[i]);
					}
					
					s_lect.selectedindex=0;					
                   }//if(xhr.status == 200)
                }				
				
};//xhr.onreadystatechange
	   xhr.send(null);	
break;

case 'room':
out_type.value = "room";
out_file.value = "";
   createRequest();
	var url = "/buildings/";
	 xhr.open("GET",url,true);
	   xhr.onreadystatechange = function(){
	   if (xhr.readyState == 4) 
			   {
			       if(xhr.status == 200) 
				   {
					 x_data=JSON.parse(xhr.responseText);
					 //Массив зданий
					 for(var i=0; i<x_data.length;i++) {
					 bld[i]=x_data[i].name;	
					 }
					 bld.sort();
					
					 //Интерфейс
					s_room.style.display = 'block';
					s_room.options[0] = new Option("Выберите корпус","0");
					for(var i=0;i<bld.length;i++){
					s_room.options[i+1] = new Option(bld[i],bld[i]);
					}
					s_room.selectedindex=0;					
                   }//if(xhr.status == 200)
                }				
				
};//xhr.onreadystatechange
	   xhr.send(null);		

}

}

function loadTimetable(url) {
	if (url=='') url = '/' + document.getElementById('idtype').value + '/' +
		document.getElementById('idfile').value.replace('.xml', '') + '/';
	createRequest();
	xhr.open("GET",url,true);
	xhr.onreadystatechange = function(){
		if (xhr.readyState == 4)
		{
			if(xhr.status == 200)
			{
                document.getElementById('tt_title').innerHTML = document.getElementById('idtitle').value;
                document.getElementById('timetable').innerHTML = xhr.responseText;
			}
		}

	};//xhr.onreadystatechange
	xhr.send(null);

}