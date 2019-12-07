function displayAll()
{
$.ajax({
type: "GET",
url: "http://localhost:8080/api/instructors",
contentType: "application/json; charset=utf-8",
dataType: "json",
success: function(result){
	console.log(result);
	
	var col = [];
	for (var i = 0; i < result.length; i++) {
		for (var key in result[i]) {
			if (col.indexOf(key) === -1) {
				col.push(key);
				console.log(key);
			}
		}
	}	
	// CREATE DYNAMIC TABLE.
	var table = document.createElement("table");
	// CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.
	var colHead = ['ID','First Name','Last Name','Phone','Email','Address','Course Taken','Edit','Delete'];
	var tr = table.insertRow(-1);               // TABLE ROW.
	for (var i = 0; i < colHead.length; i++) {
		var th = document.createElement("th");      // TABLE HEADER.
		th.innerHTML = colHead[i];
		tr.appendChild(th);
	}		
	for (var i = 0; i < result.length; i++) {
		tr = table.insertRow(-1);
		var queryStr;
		for (var j=0; j < col.length; j++) {
			var tabCell = tr.insertCell(-1);
			tabCell.innerHTML = result[i][col[j]];
			if(j==0)
			{
				queryStr=result[i][col[j]];
			}
		}
		
		var tabCell = tr.insertCell(-1);
		var queryStrEdit="AddInstructor.html?id="+queryStr.toString();
		tabCell.innerHTML = '<a id="linkEdit" href='+queryStrEdit+'>Edit</a>';
		
		var tabCell = tr.insertCell(-1);
		var queryStrDelete="Instructor.html?id="+queryStr.toString();
		tabCell.innerHTML = '<a id="linkDelete" href='+queryStrDelete+' >Delete</a>';
	}
	
	// FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
	var divContainer = document.getElementById("showData");
	divContainer.innerHTML = "";
	divContainer.appendChild(table);
	
	}
});
}


function deleteDocument(insId)
{
	$.ajax({
	type: "delete",
	url: "http://localhost:8080/api/instructors/"+insId,
	contentType: "application/json; charset=utf-8",
	dataType: "json",
	success: function(result){}
	});
	top.location.href = "Instructor.html?id=all";	
}

function modifyInstructor()
{
	var params = new window.URLSearchParams(window.location.search);
	var insId=params.get('id').toString(); 
	
	if (insId=="new")
	{
		$('#insId').val('');
		$('#fname').val('');
		$('#lname').val('');
		$('#phone').val('');
		$('#email').val('');
		$('#address').val('');
		$('#course').val('');
		$("#btnUpdate").hide();
		$("#btnSubmit").show();
	}
	else
	{
		$("#btnUpdate").show();
		$("#btnSubmit").hide();
		$.ajax({
		type: "GET",
		url: "http://localhost:8080/api/instructors/"+insId,		
		contentType: "application/json; charset=utf-8",
		dataType: "json",
		success: function(data){
				console.log(data);
				var insId=data[0]["ins_id"].toString();
				var fname=data[0]["fname"].toString();
				var lname=data[0]["lname"].toString();
				var phone=data[0]["phone"].toString();
				var email=data[0]["email"].toString();
				var address=data[0]["address"].toString();
				var course=data[0]["course_taken"].toString();
				$('#insId').val(insId);
				$('#fname').val(fname);
				$('#lname').val(lname);
				$('#phone').val(phone);
				$('#email').val(email);
				$('#address').val(address);
				$('#course').val(course);
			}
		});		
	}
}

function update()
{
	var params = new window.URLSearchParams(window.location.search);
	var insId=params.get('id').toString(); 
	
	var fname=$('#fname').val();
	var lname=$('#lname').val();
	var phone=$('#phone').val();
	var email=$('#email').val();
	var address=$('#address').val();
	var course=$('#course').val();
	
	$.ajax({
		type: "PUT",
		url: "http://localhost:8080/api/instructors/"+insId+"/"+fname+"/"+lname+"/"+phone+"/"+email+"/"+address+"/"+course,		
		contentType: "application/json; charset=utf-8",
		dataType: "json",
		success: function(data){}
		});	
	top.location.href = "Instructor.html?id=all";
}

function addNewInstructor()
{
	var insId=$('#insId').val();
	var fname=$('#fname').val();
	var lname=$('#lname').val();
	var phone=$('#phone').val();
	var email=$('#email').val();
	var address=$('#address').val();
	var course=$('#course').val();
	
	$.ajax({
		type: "POST",
		url: "http://localhost:8080/api/instructors/"+insId+"/"+fname+"/"+lname+"/"+phone+"/"+email+"/"+address+"/"+course,		
		contentType: "application/json; charset=utf-8",
		dataType: "json",
		success: function(data){}
		});	
	top.location.href = "Instructor.html?id=all";	
}