App = {
  web3Provider: null,
  contracts: {},
  emptyAddress: "0x0000000000000000000000000000000000000000",
  sku: 0,
  upc: 0,
  metamaskAccountID: "0x0000000000000000000000000000000000000000",
  ownerID: "0x0000000000000000000000000000000000000000",
  originFarmerID: "0x0000000000000000000000000000000000000000",
  originFarmName: null,
  originFarmInformation: null,
  originFarmLatitude: null,
  originFarmLongitude: null,
  productNotes: null,
  productPrice: 0,
  distributorID: "0x0000000000000000000000000000000000000000",
  retailerID: "0x0000000000000000000000000000000000000000",
  consumerID: "0x0000000000000000000000000000000000000000",

  init: async function () {
    App.readForm();
    /// Setup access to blockchain
    return await App.initWeb3();
  },

  readForm: function () {
    App.sku = $("#sku").val();
    App.upc = $("#upc").val();
    App.ownerID = $("#ownerID").val();
    App.originFarmerID = $("#originFarmerID").val();
    App.originFarmName = $("#originFarmName").val();
    App.originFarmInformation = $("#originFarmInformation").val();
    App.originFarmLatitude = $("#originFarmLatitude").val();
    App.originFarmLongitude = $("#originFarmLongitude").val();
    App.productNotes = $("#productNotes").val();
    App.productPrice = $("#productPrice").val();
    App.distributorID = $("#distributorID").val();
    App.retailerID = $("#retailerID").val();
    App.consumerID = $("#consumerID").val();

    console.log(
      App.sku,
      App.upc,
      App.ownerID,
      App.originFarmerID,
      App.originFarmName,
      App.originFarmInformation,
      App.originFarmLatitude,
      App.originFarmLongitude,
      App.productNotes,
      App.productPrice,
      App.distributorID,
      App.retailerID,
      App.consumerID
    );
  },

  initWeb3: async function () {
    /// Find or Inject Web3 Provider
    /// Modern dapp browsers...
    if (window.ethereum) {
      App.web3Provider = window.ethereum;
      try {
        // Request account access
        await window.ethereum.enable();
      } catch (error) {
        // User denied account access...
        console.error("User denied account access");
      }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
      App.web3Provider = window.web3.currentProvider;
    }
    // If no injected web3 instance is detected, fall back to Ganache
    else {
      App.web3Provider = new Web3.providers.HttpProvider(
        "http://localhost:7545"
      );
    }

    App.getMetaskAccountID();

    return App.initSupplyChain();
  },

  getMetaskAccountID: function () {
    var Web3 = require("web3");
    web3 = new Web3(App.web3Provider);

    // Retrieving accounts
    web3.eth.getAccounts(function (err, res) {
      if (err) {
        console.log("Error:", err);
        return;
      }
      console.log("getMetaskID:", res);
      App.metamaskAccountID = res[0];
    });
  },

  initSupplyChain: function () {
    /// Source the truffle compiled smart contracts
    var jsonSupplyChain = "../../build/contracts/SupplyChain.json";

    /// JSONfy the smart contracts
    $.getJSON(jsonSupplyChain, function (data) {
      console.log("data", data);
      var SupplyChainArtifact = data;
      App.contracts.SupplyChain = TruffleContract(SupplyChainArtifact);
      App.contracts.SupplyChain.setProvider(App.web3Provider);

      App.fetchItemBufferOne();
      App.fetchItemBufferTwo();
      App.fetchEvents();
    });

    return App.bindEvents();
  },

  bindEvents: function () {
    $(document).on("click", App.handleButtonClick);
  },

  handleButtonClick: async function (event) {
    event.preventDefault();

    App.getMetaskAccountID();

    var processId = parseInt($(event.target).data("id"));
    console.log("processId", processId);

    switch (processId) {
      case 1:
        return await App.harvestItem(event);
        break;
      case 2:
        return await App.processItem(event);
        break;
      case 3:
        return await App.packItem(event);
        break;
      case 4:
        return await App.sellItem(event);
        break;
      case 5:
        return await App.buyItem(event);
        break;
      case 6:
        return await App.shipItem(event);
        break;
      case 7:
        return await App.receiveItem(event);
        break;
      case 8:
        return await App.purchaseItem(event);
        break;
      case 9:
        return await App.fetchItemBufferOne(event);
        break;
      case 10:
        return await App.fetchItemBufferTwo(event);
        break;
      case 11:
        return await App.refundItem(event);
        break;
      case 12:
        return await App.applyRoles(event);
        break;
    }
  },

  harvestItem: async function (event) {
    event.preventDefault();
    var processId = parseInt($(event.target).data("id"));

    try {
      const instance = await App.contracts.SupplyChain.deployed();
      const result = await instance.harvestItem(
        App.upc,
        App.metamaskAccountID,
        App.originFarmName,
        App.originFarmInformation,
        App.originFarmLatitude,
        App.originFarmLongitude,
        App.productNotes,
        { from: App.metamaskAccountID }
      );
      $("#ftc-item").text(result);
      console.log("harvestItem", result);
    } catch (err) {
      console.error(err);
      console.error(err.message);
    }
  },

  processItem: async function (event) {
    event.preventDefault();
    var processId = parseInt($(event.target).data("id"));
    try {
      const instance = await App.contracts.SupplyChain.deployed();
      const result = await instance.processItem(App.upc, {
        from: App.metamaskAccountID,
      });
      $("#ftc-item").text(result);
      console.log("processItem", result);
    } catch (err) {
      console.error(err.message);
    }
  },

  packItem: async function (event) {
    event.preventDefault();
    var processId = parseInt($(event.target).data("id"));
    try {
      const instance = await App.contracts.SupplyChain.deployed();
      const result = await instance.packItem(App.upc, {
        from: App.metamaskAccountID,
      });
      $("#ftc-item").text(result);
      console.log("packItem", result);
    } catch (err) {
      console.error(err.message);
    }
  },

  sellItem: async function (event) {
    event.preventDefault();
    var processId = parseInt($(event.target).data("id"));
    try {
      const instance = await App.contracts.SupplyChain.deployed();
      const productPrice = web3.toWei($("#productPrice").val(), "ether");
      console.log("productPrice", productPrice);
      const result = await instance.sellItem(App.upc, productPrice, {
        from: App.metamaskAccountID,
      });
      $("#ftc-item").text(result);
      console.log("sellItem", result);
    } catch (err) {
      console.error(err.message);
    }
  },

  buyItem: async function (event) {
    event.preventDefault();
    var processId = parseInt($(event.target).data("id"));
    try {
      const instance = await App.contracts.SupplyChain.deployed();
      const result = await instance.buyItem(App.upc, {
        from: App.metamaskAccountID,
        value: App.productPrice,
      });
      $("#ftc-item").text(result);
      console.log("buyItem", result);
    } catch (err) {
      console.error(err.message);
    }
  },

  shipItem: async function (event) {
    event.preventDefault();
    var processId = parseInt($(event.target).data("id"));
    try {
      const instance = await App.contracts.SupplyChain.deployed();
      const isDistributor = await instance.isDistributor(App.metamaskAccountID);
      console.log("isDistributor", isDistributor);
      const result = await instance.shipItem(App.upc, {
        from: App.metamaskAccountID,
      });
      $("#ftc-item").text(result);
      console.log("shipItem", result);
    } catch (err) {
      console.error(err.message);
    }
  },

  receiveItem: async function (event) {
    event.preventDefault();
    var processId = parseInt($(event.target).data("id"));
    try {
      const instance = await App.contracts.SupplyChain.deployed();
      const result = await instance.receiveItem(App.upc, {
        from: App.metamaskAccountID,
        value: App.productPrice,
      });
      $("#ftc-item").text(result);
      console.log("receiveItem", result);
    } catch (err) {
      console.error(err.message);
    }
  },

  purchaseItem: async function (event) {
    event.preventDefault();
    var processId = parseInt($(event.target).data("id"));

    try {
      const instance = await App.contracts.SupplyChain.deployed();
      const isConsumer = await instance.isConsumer(App.metamaskAccountID);
      const result = await instance.purchaseItem(App.upc, {
        from: App.metamaskAccountID,
        value: App.productPrice,
      });
      $("#ftc-item").text(result);
      console.log("purchaseItem", result);
    } catch (err) {
      console.error(err.message);
    }
  },
  refundItem: async function (event) {
    event.preventDefault();
    var processId = parseInt($(event.target).data("id"));

    try {
      const instance = await App.contracts.SupplyChain.deployed();
      const result = await instance.refundItem(App.upc, {
        from: App.metamaskAccountID,
        value: App.productPrice,
      });
      $("#ftc-item").text(result);
      console.log("refundItem", result);
    } catch (err) {
      console.error(err.message);
    }
  },

  fetchItemBufferOne: async function () {
    ///   event.preventDefault();
    ///    var processId = parseInt($(event.target).data('id'));
    App.upc = $("#upc").val();
    console.log("upc", App.upc);

    try {
      const instance = await App.contracts.SupplyChain.deployed();
      const result = await instance.fetchItemBufferOne.call(App.upc);
      $("#ftc-item").text(result);
      console.log("fetchItemBufferOne", result);
      $("#product-owner").text(result[2]);
      $("#product-farmer").text(result[3]);
      $("#product-farm-name").text(result[4]);
      $("#product-farm-info").text(result[5]);
      $("#product-farm-lat").text(result[6]);
      $("#product-farm-long").text(result[7]);
    } catch (err) {
      console.error(err.message);
    }
  },

  fetchItemBufferTwo: async function () {
    ///    event.preventDefault();
    ///    var processId = parseInt($(event.target).data('id'));
    try {
      const instance = await App.contracts.SupplyChain.deployed();
      const result = await instance.fetchItemBufferTwo.call(App.upc);
      $("#ftc-item").text(result);
      console.log("fetchItemBufferTwo", result);
      $("#product-id").text(result[2]);
      $("#product-notes").text(result[3]);
      const price = result[4];
      if (price) {
        $("#product-price").text(price);
        App.productPrice = price;
      }
      $("#product-state").text(result[5] ? this.getStateName(result[5]) : "");
      $("#product-distributor").text(result[6]);
      $("#product-retailer").text(result[7]);
      $("#product-consumer").text(result[8]);
    } catch (err) {
      console.error(err.message);
    }
  },
  applyRoles: async function () {
    try {
      const instance = await App.contracts.SupplyChain.deployed();
      const isDistributor = await instance.isDistributor(App.distributorID);
      const isRetailer = await instance.isRetailer(App.retailerID);
      const isConsumer = await instance.isConsumer(App.consumerID);
      if (!isDistributor) {
        const result = await instance.addDistributor(App.distributorID, {
          from: App.metamaskAccountID,
        });
        $("#ftc-item").text(result);
      }
      if (!isRetailer) {
        const result = await instance.addRetailer(App.retailerID, {
          from: App.metamaskAccountID,
        });
        $("#ftc-item").text(result);
      }
      if (!isConsumer) {
        const result = await instance.addConsumer(App.consumerID, {
          from: App.metamaskAccountID,
        });
        $("#ftc-item").text(result);
      }
    } catch (err) {
      console.error(err);
    }
  },

  fetchEvents: function () {
    if (
      typeof App.contracts.SupplyChain.currentProvider.sendAsync !== "function"
    ) {
      App.contracts.SupplyChain.currentProvider.sendAsync = function () {
        return App.contracts.SupplyChain.currentProvider.send.apply(
          App.contracts.SupplyChain.currentProvider,
          arguments
        );
      };
    }

    App.contracts.SupplyChain.deployed()
      .then(function (instance) {
        var events = instance.allEvents(function (err, log) {
          if (!err)
            $("#ftc-events").append(
              "<li>" + log.event + " - " + log.transactionHash + "</li>"
            );
        });
      })
      .catch(function (err) {
        console.log(err.message);
      });
  },

  getStateName: function (state) {
    switch (state.toNumber()) {
      case 0:
        return "Harvested";
      case 1:
        return "Processed";
      case 2:
        return "Packed";
      case 3:
        return "For Sale";
      case 4:
        return "Sold";
      case 5:
        return "Shipped";
      case 6:
        return "Received";
      case 7:
        return "Purchased";
    }
  },
};

$(function () {
  $(window).load(function () {
    App.init();
  });
});
