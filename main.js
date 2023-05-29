model = [
    {

        //     countryName: "eg",
        //     flag: ""
        // },
        // {

        //     countryName: "tr",
        //     flag: ""
        // },
        // {

        //     countryName: "ch",
        //     flag: ""
    },


]

var eventsMediator = {
    events: {},
    on: function (eventName, callbackfn) {
        this.events[eventName] = this.events[eventName]
            ? this.events[eventName]
            : [];
        this.events[eventName].push(callbackfn);
    },
    emit: function (eventName, data) {
        if (this.events[eventName]) {
            this.events[eventName].forEach(function (callBackfn) {
                callBackfn(data);
            });
        }
    },
};


view = {

    init: function () {
        this.ajaxCallCountries();

        const countryImage = document.querySelectorAll(".con-img");

        for (let i = 0; i < countryImage.length; i++) {

            $(countryImage[i]).on("click", () => {
                // this.ajaxCall(model[i].countryName);
                console.log(model[i].countryName);
                eventsMediator.emit("data-click", model[i].countryName);



            })
        }
    },
    ajaxCall: function (countryName) {
        $.ajax({

            // Our sample url to make request
            url:
                'https://newsapi.org/v2/top-headlines?country=' + countryName + '&apiKey=c27c379706dc4775a6600dc68f1046b8',

            type: "GET",


            success: function (data) {
                var x = data.articles;
                document.getElementById("result").innerHTML = "";
                for (let i = 0; i < x.length; i++) {
                    document.getElementById("result").innerHTML += ` ${x[i].title} <br> ${x[i].description}`
                    // console.log(x);
                }

            },

            // Error handling
            error: function (error) {
                console.log(`Error ${error}`);
            }


        });
    },

    ajaxCallCountries: function () {
        $.ajax({

            // Our sample url to make request
            url:
                'https://restcountries.com/v3.1/all?fields=name,cca2,flags',

            // Type of Request
            type: "GET",

            // Function to call when to
            // request is ok
            success: function (data) {
                console.log(data)
                const caro = document.querySelector(".carousel-inner");
                for (let i = 0; i < data.length; i++) {
                    console.log(i);

                    let country = { "countryName": data[i].cca2, "flag": data[i].flags.svg }

                    model.push(country);
                    caro.innerHTML += `
                    <div class="carousel-item ${i == 0 ? "active" : ""}">
                        <img src="${country.flag}" class="d-block w-100 con-img"
                            alt="...">
                    </div>
                    `
                    console.log(data[i]);
                }
            },

            // Error handling
            error: function (error) {
                console.log(`Error ${error}`);
            }
        });

    },

    render: function () {


        this.ajaxCall();


    }
}

controller = {
    init: function () {
        view.init();
        view.render()
    },
}

controller.init();


eventsMediator.on("data-click", function (countryName) { view.ajaxCall(countryName) });

//   eventsMediator.emit("data-click", this.data);
