
function downloadurl(req, res, next) {
    console.log("Sending downloadable url to user...");
    next();
  }
  
  module.exports = downloadurl;