document.querySelector('#copyToClipboard').addEventListener('click', copyToClipboard)

function copyToClipboard() {
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
    navigator.clipboard.writeText(output).then(function() {
      console.log('Copying to clipboard was successful!');
    }, function(err) {
      console.error('Could not copy text: ', err);
    });
}


