var inputContactName = document.getElementById("inputContactName");
var inputContactNumber = document.getElementById("inputContactNumber");
var inputContactEmail = document.getElementById("inputContactEmail");
var inputContactAddress = document.getElementById("inputContactAddress");
var selectContactGroup = document.getElementById("selectContctGroup");
var inputContactText= document.getElementById("inputContactText");





var contactlist = []

if(localStorage.getItem("contactlist"))
    {
       contactlist = JSON.parse(localStorage.getItem("contactlist"))  
    }
 showContact();


function addContact()
{
   var contactData =
   {
     name : inputContactName.value,
     number : inputContactNumber.value,
     email : inputContactEmail.value,
     address : inputContactAddress.value,
     group : selectContactGroup.value,
     text : inputContactText.value
   }

   if(editIndex !== null)
   {
       contactlist[editIndex] = contactData;   
       editIndex = null;                       
   }
   else
   {
       contactlist.push(contactData);          
   }

   clearContact();
   localStorage.setItem("contactlist", JSON.stringify(contactlist));
   showContact();
}
function clearContact()
{
    inputContactName.value ="";
    inputContactNumber.value ="";
    inputContactEmail.value="";
    inputContactAddress.value="";
    selectContactGroup.value="";
    inputContactText.value="";
}

function showContact()
{
    Box = "";
    for(var i=0; i< contactlist.length;i++)
    {
        Box += 
        `
                    <div class="col-6">
                                            <!-- Card -->
                                         <div class="contact-card">
                                            <div class="contact-card-head d-flex gap-3 align-items-center">
                                                <div class="contact-card-head-icon d-flex">
                                                    <span ${i} class="m-auto">${getUpperName(contactlist[i].name)}</span>
                                                </div>
                                                <div class="contact-card-head-text d-flex flex-column">
                                                    <h3>${contactlist[i].name}</h3>
                                                    <div class="contact-card-head-text-phone gap-2 d-flex align-items-center">
                                                        <div class="contact-card-head-text-phone-icon d-flex">
                                                            <i class="fa-solid fa-phone m-auto"></i>
                                                        </div>
                                                        <span>${contactlist[i].number}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="contact-card-information d-flex flex-column gap-2">
                                                <div class="contact-card-email d-flex align-items-center gap-2">
                                                    <div class="contact-card-email-icon d-flex">
                                                        <i class="fa-solid fa-envelope m-auto"></i>
                                                    </div>
                                                    <span>${contactlist[i].email}</span>
                                                </div>
                                                <div class="contact-card-location d-flex align-items-center gap-2">
                                                    <div class="contact-card-location-icon d-flex">
                                                        <i class="fa-solid fa-map-marker-alt m-auto"></i>
                                                    </div>
                                                    <span>${contactlist[i].address}</span>
                                                </div>
                                                <div class="contact-card-staute d-flex align-items-center gap-2">
                                                    <div class="contact-card-staute-group d-flex">
                                                        <span class="m-auto">${contactlist[i].group}</span>
                                                    </div>
                                                    <div class="contact-card-staute-emergency d-flex align-items-center gap-1">
                                                        <i class="fa-solid fa-heart-pulse"></i>
                                                        <span>Emergency</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <hr>

                                            <div class="contact-card-tags d-flex justify-content-between">

                                                <div class="contact-card-tags-phone-email d-flex gap-2">
                                                    <div class="contact-card-tag-phone d-flex">
                                                        <i class="fa-solid fa-phone m-auto"></i>
                                                    </div>
                                                    <div class="contact-card-tag-email d-flex">
                                                        <i class="fa-solid fa-envelope m-auto"></i>
                                                    </div>
                                                </div>
                                                <div class="contact-card-tags-update d-flex gap-2">
                                                    <div onclick="addFavorites(${i})"  class="contact-card-tag-star d-flex"><i class="fa-solid fa-star m-auto"></i></div>
                                                    <div onclick="addEmergency(${i})" class="contact-card-tag-heart d-flex"><i class="fa-solid fa-heart-pulse m-auto"></i></div>
                                                    <div onclick="updateContact(${i})"  class="contact-card-tag-pen d-flex"><i class="fa-solid fa-pen m-auto"></i></div>
                                                    <div onclick="deleteContact(${i})" class="contact-card-tag-trash d-flex"><i class="fa-solid fa-trash m-auto"></i></div>
                                                </div>
                                            </div>

                                         </div>   
                                         </div>

                                        
        `
    }
    document.getElementById("rowData").innerHTML = Box;  
    document.getElementById("Total").innerHTML = contactlist.length;

}

function getUpperName(name)
{
    if(!name || name.trim() === "") return "??";
    var words = name.trim().split(" ");
    return (words[0][0] + words[words.length - 1][0]).toUpperCase();
}

function deleteContact(index)
{
   contactlist.splice(index,1)
    localStorage.setItem("contactlist", JSON.stringify(contactlist));
   showContact();
}

var editIndex = null;

function updateContact(index)
{
    console.log(contactlist[index]);
    var contact = contactlist[index];
    inputContactName.value = contact.name;
    inputContactNumber.value = contact.number;
    inputContactEmail.value = contact.email;
    inputContactAddress.value = contact.address;
    selectContactGroup.value = contact.group;

    editIndex = index;   

    var modal = new bootstrap.Modal(document.getElementById("addContactModal"));
    modal.show();
}
var Favoriteslist = [];
if(localStorage.getItem("Favoriteslist"))
    {
       Favoriteslist = JSON.parse(localStorage.getItem("Favoriteslist"))  
    }
    showFavorites();

 
function showFavorites()
{
    Box = "";
    for(var i = 0; i < Favoriteslist.length ; i++)
    {
        Box += 
        `
                                        <div  class="sidebar-favorites-body d-flex justify-content-between ">
                                        <div class="sidebar-favorites-body-content d-flex gap-3">
                                            <div class="sidebar-favorites-body-head d-flex">
                                                <span   class="m-auto">${getUpperName(Favoriteslist[i].name)}</span>
                                            </div>
                                            <div class="sidebar-favorites-body-text d-flex flex-column gap-1">
                                                <h5>${Favoriteslist[i].name}</h5>
                                                <p>${Favoriteslist[i].number}</p>
                                            </div>
                                        </div>

                                        <div class="sidebar-favorites-body-icon d-flex">
                                            <i class="fa-solid fa-phone m-auto"></i>
                                        </div>
                                        </div>

                                    
        `
    }
     document.getElementById("favorites").innerHTML = Box;
     document.getElementById("Favorite").innerHTML = Favoriteslist.length;
}

function addFavorites(index)
{
    var contact = contactlist[index];

    var existingIndex = Favoriteslist.findIndex(function(fav) {
        return fav.name === contact.name && fav.number === contact.number;
    });

    if(existingIndex !== -1)
    {
        Favoriteslist.splice(existingIndex, 1);
    }
    else
    {
        Favoriteslist.push({ name: contact.name, number: contact.number });
    }

    localStorage.setItem("Favoriteslist", JSON.stringify(Favoriteslist));
    showFavorites();
}

var EmergencyList = [];

if(localStorage.getItem("EmergencyList"))
    {
       EmergencyList = JSON.parse(localStorage.getItem("EmergencyList"))  
    }
    showEmergency();

function addEmergency(index)
{
    var contact = contactlist[index];

    var existingIndex = EmergencyList.findIndex(function(item) {
        return item.name === contact.name && item.number === contact.number;
    });

    if(existingIndex !== -1)
    {
        EmergencyList.splice(existingIndex, 1);
    }
    else
    {
        EmergencyList.push({ name: contact.name, number: contact.number });
    }

    localStorage.setItem("EmergencyList", JSON.stringify(EmergencyList));
    showEmergency();
}

function showEmergency()
{
    Box = "";
    for(var i =0;i<EmergencyList.length;i++) 
        {
            Box += 
            `
                <div class="sidebar-Emergency-body ">
                                          <div class="sidebar-Emergency-body-main  d-flex justify-content-between ">
  
                                              <div class="sidebar-Emergency-body-content  d-flex gap-3">
                                                  <div class="sidebar-Emergency-body-head d-flex">
                                                      <span class="m-auto">${getUpperName(EmergencyList[i].name)}</span>
                                                  </div>
                                                  <div class="sidebar-Emergency-body-text d-flex flex-column gap-1">
                                                      <h5>${EmergencyList[i].name}</h5>
                                                      <p>${EmergencyList[i].number}</p>
                                                  </div>
                                              </div>
      
                                              <div class="sidebar-Emergency-body-icon d-flex">
                                                  <i class="fa-solid fa-phone m-auto"></i>
                                              </div>
                                          </div>
  
                                      </div>

            `
        }  
        document.getElementById("emergency").innerHTML = Box;
        document.getElementById("Emergency").innerHTML = EmergencyList.length;
}
