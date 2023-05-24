var connection = new solanaWeb3.Connection("https://spring-frosty-snowflake.solana-mainnet.discover.quiknode.pro/5584f3ace79637af8f83a6f135554af9e0f0ffca/");
var programID = new solanaWeb3.PublicKey("39mBcnQ27QA9nNZmM6VrumE2vtqs5v3HD7t7RGv9kXUV");

async function showAccs(id1, id2){
  var b58id = base58.encode([id1, id2]);
  var accs = await connection.getProgramAccounts
    (programID, 
      {filters:
       [
        {memcmp: {offset: 0, bytes: b58id} }, 
       ],
       dataSlice: {length: 0, offset: 0}
      }
    );
  var display = document.getElementById("display");
  display.innerHTML = "";
  for(var x = 0; x < accs.length; x++){
    var h1 = document.createElement("h1");
    var link = document.createElement("a");
    link.innerHTML = accs[x].pubkey.toBase58();
  }
}

async function populate(){
  var pubkey = window.location.href.split("?")[1];
  document.getElementById("pubkey").innerHTML = pubkey;

  var keyform = new solanaWeb3.PublicKey(pubkey);
  var info = await connection.getAccountInfo(keyform);
  //document.getElementById("lamports").innerHTML = info.lamports;
  //document.getElementById("sol").innerHTML = info.lamports / 1000000000;

  var homeStake = (info.data[2] * 256 + info.data[3]) / 100;
  var awayStake = (info.data[4] * 256 + info.data[5]) / 100;
  var totalStake = homeStake + awayStake;
  var homeOdds = totalStake / homeStake;
  var awayOdds = totalStake / awayStake;

  document.getElementById("homeStake").innerHTML = "$" + homeStake;
  document.getElementById("homeOdds").innerHTML = homeOdds;

  document.getElementById("awayStake").innerHTML = "$" + awayStake;
  document.getElementById("awayOdds").innerHTML = awayOdds;
  
  document.getElementById("home").innerHTML = new solanaWeb3.PublicKey(info.data.slice(6, 38)).toBase58();
  document.getElementById("away").innerHTML = new solanaWeb3.PublicKey(info.data.slice(38, 70)).toBase58();

  var pbid = info.data[0] * 256 + info.data[1];
}
