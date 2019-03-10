
let apiKey = "AIzaSyBMuiP0cMmLEgT4-f2yHfJatdWxYmRHPB0"

function handleFetch(q, callback) {
    $.ajax({
        url: "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10",
        method: "GET",
        data: {
            key : apiKey,
            q : q
        },
        dataType: "json",
        success: responseJson => callback(responseJson),
        error : err => console.log(err)
    })
}

function displayResults(data) {
    console.log(data)
    $('.results').html('')
    data.items.forEach((item, index) => {
        let thumbnail = item.snippet.thumbnails.medium.url
        let link = item.id.videoId
        $('.results').append(`
            <a target="-blank" href="https://www.youtube.com/watch?v=${link}">
                <h3>${item.snippet.title}</h3>
            </a>
            <a id="thumb" target="-blank" href="https://www.youtube.com/watch?v=${link}">
                <img src="${thumbnail}" alt="thumbnail">
            </a>
        `)
    })
    $('.results').append(`
        <div class = "moreResultsDiv">
            <button class="resButton" id="prevres" type="button">Previous Results</button>
            <button class="resButton" id="nextres" type="button">Next Results</button>
        </div>
    `)
}

$('.results').on("click","#prevres", function(event){
    console.log("previous results")
})

$('.results').on("click","#nextres", function(event){
    console.log("next results")
})

function watchForm() {
    $('.ytForm').on('submit', (event) => {
        event.preventDefault()
        let q = $('#searchBox').val()
        handleFetch(q, displayResults)
    })
}

$(watchForm)
