 function fnSendMsg(evt) {
        window.parent.postMessage("keypress-from-game", "*");
      }
      document.body.addEventListener("click", function (event) {
        fnSendMsg(event);
      });
      document.addEventListener("keypress", function (event) {
        fnSendMsg(event);
      });
      document.addEventListener("keydown", function (e) {
        fnSendMsg(event);
      });
      document.addEventListener("keyup", function (e) {
        fnSendMsg(event);
      });