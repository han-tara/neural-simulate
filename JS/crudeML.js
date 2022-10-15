//created by fathan 4/15/2022 because bored

//inisiasi canvas
const weightCanvas = $('#weightView')
const weightVal = $('#weightValue')
weightCanvas[0].width = size
weightCanvas[0].height = size
const wCtx = weightCanvas[0].getContext('2d')
wCtx.scale(30,30)
wCtx.fillStyle = colorGradient(0)
wCtx.fillRect(0,0,size,size)

//inisiasi weight
let lineWeight = [0] //value harus posX*posY*magnitude ex: 3*2*-3 ... index ke-0 jumlah iterasi
let weightCord = [] //simpan magnitude line, to call it -1 lineweight index
weightVal.val(lineWeight)
$('#ni').text('Number of interation: '+lineWeight[0])
$('#load').click(el=>{
    lineWeight = weightVal.val().split(',') //apabila user load
    lineWeight[0] = parseInt(lineWeight[0])
    lineWeight.forEach((el,id)=>{
        if (id > 0) { //make sure index 0 (total iteration) is not calculate
            el = el.split('*') //array ex [3,2,-3]
            weightCord.push(parseInt(el[0]+'*'+el[1])) //3*2
        }
    })
    $('#ni').text('Number of interation: '+lineWeight[0]) //ubah text
})

//testing
$('#test').click(el=>{
    let bias = 0
    lineWeight.forEach((el,id)=>{
        if (id > 0) { //make sure index 0 (total iteration) is not calculate
            el = el.split('*') //array ex [3,2,-3]
            let checkWeight = el[0]+'*'+el[1] //string ex 3-2
            if (pixel.includes(checkWeight) == true && pixel.length > 0) {
                bias += parseInt(el[2]) //int ex -3
            }
        }
    })
    bias * 0.1
    let outputVal = rounding(100/(1 + Math.pow(Math.E,-bias))) //activation function result 0-100
    console.log(outputVal)
    if (outputVal >= 48 && outputVal <= 52) {
        $('#hasil').text('Result: none')
    }
    if (outputVal < 48) {
        let outputPercentage = rounding((-25*(outputVal-48))/12) + '%' //map 48-0 to 0-100
        $('#hasil').text('Result: rectangle '+outputPercentage)
    } else if (outputVal > 52) {
        let outputPercentage = rounding((25*(outputVal-52))/12) + '%' //map 52-100 to 0-100
        $('#hasil').text('Result: circle '+outputPercentage)
    }
})
//false
$('#isCircle').click(el=>{
    lineWeight[0] = lineWeight[0] + 1 //tambah interasi
    $('#ni').text('Number of interation: '+lineWeight[0]) //ubah text

    //add to weight
    pixel.forEach(el=>{
        if (weightCord.includes(el) == true) { //apabila sudah ada then kita update
            let wVal = lineWeight[weightCord.indexOf(el)+1].split('*') // tabel 3,2,-3
            let nVal = parseInt(wVal[2]) + 1 // int -3 + 1 = -2
            lineWeight[weightCord.indexOf(el)+1] = wVal[0]+'*'+wVal[1]+'*'+nVal //string 3,2,-2
        } else {
            lineWeight.push(el+'*1')
            weightCord.push(el)
        }
    })

    weightVal.val(lineWeight) //ubah textbox
})
$('#isRect').click(el=>{
    lineWeight[0] = lineWeight[0] + 1 //tambah interasi
    $('#ni').text('Number of interation: '+lineWeight[0]) //ubah text

    //subtract
    pixel.forEach(el=>{
        if (weightCord.includes(el) == true) { //apabila sudah ada then kita update
            let wVal = lineWeight[weightCord.indexOf(el)+1].split('*') // tabel 3,2,-3
            let nVal = parseInt(wVal[2]) - 1 // int -3 - 1 = -4
            lineWeight[weightCord.indexOf(el)+1] = wVal[0]+'*'+wVal[1]+'*'+nVal //string 3,2,-4
        } else {
            lineWeight.push(el+'*-1')
            weightCord.push(el)
        }
    })
    weightVal.val(lineWeight) //ubah textbox
})
function rounding(val) {
    return Math.round((val+ Number.EPSILON) * 100) / 100
}
function map_range(value, low1, high1, low2, high2) {
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}
function colorGradient(val) { //visualize, red = negative weight green = positive weight
    val = map_range(val,-9,9,0,100)
    let redVal = Math.round(255 * (100-val) * 0.01)
    let greenVal = Math.round(255 * val * 0.01)
    return 'rgba('+redVal+','+greenVal+',0)'
}
