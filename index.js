(function (DOM, doc) {
  'use strict';  

  function app(){
    var $marcaInput = new DOM('[data-js="marca-input"]');
    var $anoInput = new DOM('[data-js="ano-input"]');
    var $placaInput = new DOM('[data-js="placa-input"]');
    var $corInput = new DOM('[data-js="cor-input"]');
    var $imagemInput = new DOM('[data-js="imagem-input"]');    
    let $carTable = new DOM('[data-js="car-table"]');
    var $nomeEmpresa = new DOM('[data-js="nome-empresa"]');
    var $telefoneEmpresa = new DOM('[data-js="telefone-empresa"]');    
    var $form = new DOM('form');
  
    $form.on('submit', handleCreateCar);
      
    (function handleNameAndPhone(){     
      var ajax = new XMLHttpRequest();       
      ajax.open('GET', `company.json`);
      ajax.send();

      ajax.addEventListener('readystatechange', () => {
        if(ajax.readyState === 4 && ajax.status === 200) {
          const data = JSON.parse(ajax.responseText); 
          
          $nomeEmpresa.get()[0].textContent = data.name;
          $telefoneEmpresa.get()[0].textContent = data.phone;
        }
      });          

      console.log(ajax.responseText);
    })();
            
    function cleanCarFields() {
      $marcaInput.get()[0].value = "";
      $anoInput.get()[0].value = "";
      $placaInput.get()[0].value = "";
      $corInput.get()[0].value = "";
      $imagemInput.get()[0].value = "";
    }
  
    function handleCreateCar(e) {
      e.preventDefault();

      var car = {
        marca: $marcaInput.get()[0].value,
        ano: $anoInput.get()[0].value,
        placa: $placaInput.get()[0].value,
        cor: $corInput.get()[0].value,
        imagem: $imagemInput.get()[0].value,
      };          

      cleanCarFields();
      
      createCarList(car);
    }    

    function createCarList(car) {      
      var $fragment = doc.createDocumentFragment();      

      var $tr = doc.createElement('tr');     
      
      var $tdMarca = doc.createElement('td');
      var $tdAno = doc.createElement('td');
      var $tdPlaca = doc.createElement('td');
      var $tdCor = doc.createElement('td');
      var $tdImg = doc.createElement('td');
                                
      $tdMarca.appendChild(doc.createTextNode(car['marca']));      
      $tdAno.appendChild(doc.createTextNode(car['ano']));      
      $tdPlaca.appendChild(doc.createTextNode(car['placa']));      
      $tdCor.appendChild(doc.createTextNode(car['cor']));

      var $img = doc.createElement('img');
      $img.src = car['imagem'];      

      $tdImg.appendChild($img);      

      $tr.appendChild($tdMarca);
      $tr.appendChild($tdAno);
      $tr.appendChild($tdPlaca);
      $tr.appendChild($tdCor);              
      $tr.appendChild($tdImg);      
              
      $fragment.appendChild($tr);
      $carTable.get()[0].lastElementChild.appendChild($fragment);
    };    
  }

  app();
})(window.DOM, document);
