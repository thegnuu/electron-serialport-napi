const { ipcRenderer } = require("electron");

(async () => {
  const ports = await ipcRenderer.invoke("serialport-list");
  console.log("loaded ports", ports);

  const portSelect = document.getElementById("port-select");
  for (const port of ports) {
    var opt = document.createElement("option");
    opt.value = port.path;
    opt.innerHTML = port.path;
    portSelect.appendChild(opt);
  }

  const infosTextarea = document.getElementById("infos");
  const addText = (text) => {
    infosTextarea.value = infosTextarea.value + text + "\n";
  };

  const connectButton = document.getElementById("connect-button");
  connectButton.addEventListener("click", async () => {
    const path = portSelect.options[portSelect.selectedIndex].value;
    if (path) {
      await ipcRenderer.invoke("serialport-connect", { path });
      addText("-- connected to : " + path);
      ipcRenderer.on("serialport-data-" + path, (event, data) => {
        addText("data: " + data);
      });
    }
  });
})();
