document.querySelector('#copyToClipboard').addEventListener('click', copyToClip)
document.querySelector('#emailCopy').addEventListener('click', createEmail)

async function copyToClip() {
    var form = document.getElementById("classDetails");
    var output = "";
    for (var i = 0; i < form.length; i++) {
      switch(form.elements[i].name){
        case 'name':
          output += `${form.elements[i].value} \n`
          break;
        case 'classDate':
          output += `${form.elements[i].value} \n`
          break;
        case 'rate':
          output += `$${form.elements[i].value} \n`
          break;
        case 'topic':
          output += `${form.elements[i].value} \n\n`
          break;
        case 'pros':
          output += `${form.elements[i].placeholder}: ${form.elements[i].value} \n\n`
          break;
        case 'cons':
          output += `${form.elements[i].placeholder}: ${form.elements[i].value} \n\n`
          break;
        case 'homework':
          output += `${form.elements[i].placeholder}: ${form.elements[i].value}`
          break;
      }
    }

    try {
      await navigator.clipboard.writeText(output)
      this.textContent = 'Copied!';
      console.log("Text copied to clipboard!");

      // Revert the button text after 3 seconds
      setTimeout(() => {
        this.textContent = 'Copy';
      }, 3000);

    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
    
}


async function createEmail() {
  var form = document.getElementById("classDetails")
  var output = ""
  var topic = ""
  var date = new Date();
  
  for (var i = 0; i < form.length; i++) {
      switch(form.elements[i].name){
          case 'name':
              output += `Name: ${form.elements[i].value} \n`
              break;
          case 'rate':
              output += `Rate: $${form.elements[i].value} \n`
              break;
          case 'topic':
              topic = form.elements[i].value
              break;
          case 'pros':
              output += `What went well?: ${form.elements[i].value} \n\n`
              break;
          case 'cons':
              output += `What to improve?: ${form.elements[i].value} \n\n`
              break;
          case 'homework':
              output += `Homework: ${form.elements[i].value}`
              break;
      }
  }

  var formattedDate = date.toLocaleDateString('en-AU', { day: '2-digit', month: '2-digit', year: '2-digit' })

  // Create the mailto link
  var mailto_link = 'https://mail.google.com/mail/?view=cm&fs=1&to=&su=' + encodeURIComponent(`${formattedDate} ${topic}`) + '&body=' + encodeURIComponent(output)

  // Open the mailto link
  window.open(mailto_link, '_blank')
}

// Assuming you have a date string in the format yyyy-mm-dd
var dateStr = '<%= details.classDate %>';
var date = new Date(dateStr);
var formattedDate = date.toLocaleDateString('en-GB');



