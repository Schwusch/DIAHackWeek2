import { Meteor } from 'meteor/meteor';
import { HTTP } from 'meteor/http';

Meteor.startup(() => {
  // code to run on server at startup
  generate_questions();
});

function generate_questions () {
  HTTP.call("GET",
  "http://build.dia.mah.se/pois?latitude=55.595778&longitude=13.014468&within=10000&categories=sights",
  {}, function(error, response){
    if(error){
      console.log(error);
    } else {
      JSON.parse(response.content).results[0];
    }
  });

}
