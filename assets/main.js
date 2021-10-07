$(function() {
  var client = ZAFClient.init();
  client.invoke('resize', { width: '100%', height: '670px' });

  client.get('ticket.requester.id').then(
    function(data) {
      var user_id = data['ticket.requester.id'];
          requestUserInfo(client, user_id);
    }
  );

});

var city = 'Brasilia';
var country = 'br'
var url_in = 'http://api.openweathermap.org/data/2.5/weather?q=';
var token = '79dd9d375832c4905678d911d2f59bd4';
var url_api = url_in + city + ',' + country + '&APPID=' + token;
var api_type;
var api_datatype;
var api_url;
var api_response;
/*url_api = url_api.toString();*/
var ativo_data1 = 'Tipo do equipamento: Desktop';
var ativo_data2 = 'Modelo: Dell Latitude 9092';
var ativo_data3 = 'Processador Intel(R) Core(TM) i7-4771';
var ativo_data4 = 'CPU @ 3.50GHz, 3501 Mhz';
var ativo_data5 = '4 Núcleo(s)';
var ativo_data6 = '8 Processador(es) Lógico(s)';
var ativo_data7 = 'BaseBoard ASRock';
var ativo_data8 = 'Produto B85 Killer';
var ativo_data9 = 'HDD 2TB Kingston';
var ativo_data10 = 'SSD 1TB Kingston';
var ativo_data11 = 'Fone Geneys Triple Fan 1250w';
var ativo_data12 = 'GPU Gigabyte NVidia';
var ativo_data13 = 'GeForce RTX 3090ti 16GB';
var ativo_data14 = 'RAM 32,0 GB';
var ativo_data15 = 'SO Windows 10 Pro (64 bits)';
var ativo_data16 = 'Microsoft Corporation';
var ativo_data17 = 'Versão 21H2';
var ativo_data18 = 'Instalado em ‎02/‎07/‎2021';
var ativo_data19 = 'Compilação do SO 19044.1237';
var ativo_data20 = 'Experience Pack 120.2212.3920.0';
var ativo_data21 = 'Garantia: Sim';
var ativo_data22 = 'Vigência: 08/2022';
var ativo_data23 = 'Sistemas Instalados/Licenciados:';
var ativo_data24 = 'Office Pro, Adobe Studio';

function requestUserInfo(client, id) {
  var settings = {
    url: '/api/v2/users/' + id + '.json',
    type:'GET',
    dataType: 'json',
  };

    client.request(settings).then(
        function (data) {
            showInfo(data);
        },
        function (response) {
            showError(response);
        }
    );
}

function requestExternalData() {
    var settings_ext = {
        url: url_api,
        type: 'GET',
        dataType: 'json',
    };
    api_type = settings_ext.type;
    api_datatype = settings_ext.dataType;
    api_url = settings_ext.url;
    api_response = 'teste 12345'
}


function showInfo(data) {
    requestExternalData();
    var requester_data = {
        'name': data.user.name,
        'tags': data.user.tags,
        'created_at': formatDate(data.user.created_at),
        'last_login_at': formatDate(data.user.last_login_at),        
        'external_url': api_url,
        'ativo_data1': ativo_data1,
        'ativo_data2': ativo_data2,
        'ativo_data3': ativo_data3,
        'ativo_data4': ativo_data4,
        'ativo_data5': ativo_data5,
        'ativo_data6': ativo_data6,
        'ativo_data7': ativo_data7,
        'ativo_data8': ativo_data8,
        'ativo_data9': ativo_data9,
        'ativo_data10': ativo_data10,
        'ativo_data11': ativo_data11,
        'ativo_data12': ativo_data12,
        'ativo_data13': ativo_data13,
        'ativo_data14': ativo_data14,
        'ativo_data15': ativo_data15,
        'ativo_data16': ativo_data16,
        'ativo_data17': ativo_data17,
        'ativo_data18': ativo_data18,
        'ativo_data19': ativo_data19,
        'ativo_data20': ativo_data20,
        'ativo_data21': ativo_data21,
        'ativo_data22': ativo_data22,
        'ativo_data23': ativo_data23,
        'ativo_data24': ativo_data24
        /*'external_data': api_response
         'external_type': api_type,
        'external_datatype': api_datatype,
         */
  };

  var source = $("#requester-template").html();
  var template = Handlebars.compile(source);
  var html = template(requester_data);
  $("#content").html(html);
}


function showError(response) {
  var error_data = {
    'status': response.status,
    'statusText': response.statusText
  };
  var source = $("#error-template").html();
  var template = Handlebars.compile(source);
  var html = template(error_data);
  $("#content").html(html);
}


function formatDate(date) {
  var cdate = new Date(date);
  var options = {
    year: "numeric",
    month: "short",
    day: "numeric"
  };
  date = cdate.toLocaleDateString("en-us", options);
  return date;
}
