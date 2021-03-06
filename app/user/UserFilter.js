(function(window) {
    var angular = window.angular;
    angular.module('pttr.user')
        .filter("emptyFields", function() {
            return function(items) {
                var filtered = items;
                if (items != undefined) {   
                    filtered = [];
                    for (var i = 0; i < items.length; i++) {
                        var item = items[i];
                        if (item.pictures.largePicture != undefined &&  item.pictures.largePicture != "" && item.breed !== undefined && item.description !== undefined && item.id !== undefined && item.belongsToShelter !== undefined && item.sex !== undefined && item.status !== undefined) {
                            filtered.push(item);
                        }
                    }
                }
                return filtered;
            }
        })
        .filter("limitdesc", function() {
            return function(items) {
                if (items.search(":") !== -1) {
                    var output = items.substr(0, items.lastIndexOf("\n"));
                    var spliter = output.split(" ");
                    spliter[0] = '<p>' + spliter[0];
                    for (var a = 1; a < spliter.length; a++) {
                        if (spliter[a].search(":") !== -1) {
                            spliter[a] = '</p><p>' + spliter[a];
                        }
                    }
                    spliter[spliter.length - 1] = spliter[spliter.length - 1] + '</p>';
                    return spliter.join(" ");
                } else if (items === "") {
                    return "";
                } else {
                    var spliter = items.split(" "),
                        limit = [];
                    for (var a = 0; a < 20; a++) {
                        limit.push(spliter[a]);
                    }
                    return limit.join(" ") + "...";
                }
            }
        })
        .filter("animalytype", function() {
            return function(items, pet, breed) {
                var filtered = items;
                if( pet != undefined && breed != undefined){
                    temp = [];
                    for (var b = 0; b < items.length; b++) {
                        if (breed.breed === items[b].breed && pet === items[b].species) {
                            temp.push(items[b]);
                        }
                    }
                    filtered = temp;
                }
                if (pet != undefined && breed == undefined) {
                    temp = [];
                    for (var b = 0; b < items.length; b++) {
                        if (pet === items[b].species) {
                            temp.push(items[b]);
                        }
                    }
                    filtered = temp;
                }
                return filtered;
            }
        })
}(window));
