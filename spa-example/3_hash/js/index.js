(function () {
  const root = document.querySelector('.app-root');
  const backbtn = document.getElementById("backbutton");
  const forwardbtn = document.getElementById("forwardbutton");

  backbtn.addEventListener('click', function(){
    window.history.back();
  },false);

  forwardbtn.addEventListener('click', function(){
      window.history.forward();
  },false);
  //history 객체 사용해보기

  function render(data) { //5
    const json = JSON.parse(data);
    root.innerHTML = `<h1>${json.title}</h1><p>${json.content}</p>`;
  }
  // routes에서 json 파일을 긁어오는 get 함수가 성공적으로 마무리 되었을 때 해당 함수를 통해 문서를 변화시킨다.

  function renderHtml(html) {
    root.innerHTML = html;
  }

  function get(url) { //4
    return new Promise((resolve, reject) => {
      const req = new XMLHttpRequest();
      req.open('GET', url);
      req.send();

      req.onreadystatechange = function () {
        if (req.readyState === XMLHttpRequest.DONE) {
          if (req.status === 200) resolve(req.response);
          else reject(req.statusText);
        }
      };
    });
  }
  // get은 routes에서 사용되는 함수로 json데이터를 끌어오는 함수이다.
  // xmlhttprequest를 통해 이동한 url와 짝을 이루는 json 파일의 데이터를 읽어오는 함수이다.

  const routes = { //3
    '': function () {
      get('/data/home.json').then(render);
    },
    'service': function () {
      get('/data/service.json').then(render);
    },
    'about': function () {
      get('/data/about.html').then(renderHtml);
    },
    otherwise() {
      root.innerHTML = `${location.hash} Not Found`;
    }
  };

  function router() {
    // url의 hash를 취득
    alert("hash change");
    const hash = location.hash.replace('#', '');
    (routes[hash] || routes.otherwise)(); //2
      // hash 에 변화가 생겼을 시 location의 hash의 값을 가져와 #을 제거하고 처리한 hash 값으로 라우팅 함수를 호출한다.
  }

  // 네비게이션을 클릭하면 uri의 hash가 변경된다. 주소창의 uri가 변경되므로 history 관리가 가능하다.
  // 이때 uri의 hash만 변경되면 서버로 요청을 수행하지 않는다.
  // 따라서 uri의 hash가 변경하면 발생하는 이벤트인 hashchange 이벤트를 사용하여 hash의 변경을 감지하여 필요한 AJAX 요청을 수행한다.
  // hash 방식의 단점은 uri에 불필요한 #이 들어간다는 것이다.
  window.addEventListener('hashchange', router); // 1

  // DOMContentLoaded은 HTML과 script가 로드된 시점에 발생하는 이벤트로 load 이벤트보다 먼저 발생한다. (IE 9 이상 지원)
  // 새로고침이 클릭되었을 때, 웹페이지가 처음 로딩되었을 때, 현 페이지(예를들어 loclahost:5003/#service)를 요청하므로 index.html이 재로드되고 DOMContentLoaded 이벤트가 발생하여 router가 호출된다.
  window.addEventListener('DOMContentLoaded', router);
}());
