export default {
  scenes: [
    {
      title: "A01",
      layers: ["A/A01/A01_bg.png","A/A01/A01_explode.png","A/A01/A01_smoke.png"],
      audios: ["Audio/explode.wav"]
    },{
      title: "A02",
      layers: ["A/A02/A02_bg.png",{
        src: "A/A02/A02_villain.png",
        getPanX: delta=>delta*-0.5,
        // getPanY: delta=>delta*-0.4,

      }],
      audios: ["Audio/evillaugh.mp3"]
    },{
      title: "A03",
      layers: ["A/A03/A03_bg.png","A/A03/A03_villain.png",{
        src: "A/A03/A03_front.png",
        getPanY: d=>d*-0.1
      }],
      audios: ["Audio/cardoor.wav"]
    },
    {
      title: "B01",
      layers: ["B/B01/B01_bg.png"]
    },{
      title: "B02",
      layers: ["B/B02/B02_bg.png"],
      audios: ["Audio/datasound.wav"]
    },{
      title: "B03",
      layers: ["B/B03/B03_bg.png","B/B03/B03_paper.png"],
      audios: ["Audio/cheer.mp3"]
    },{
      title: "B04",
      layers: ["B/B04/B04_bg.png","B/B04/B04_dialog.png","B/B04/B04_villain.png"]
    },
    {
      title: "C01",
      layers: ["C/C01/C01_bg.png","C/C01/C01_fire.png","C/C01/C01_anderson.png","C/C01/C01_speedline.png",],
      audios: [ ]
    },{
      title: "C02",
      layers: ["C/C02/C02_bg.png",{
        src: "C/C02/C02_anderson.png",
        // getPanX: d => -d*0.1,
        // getPanY: d => d*0.1,
        // getScale: d=>1.2

      },{
        src: "C/C02/C02_villain.png",
        // getPanX: d => -d*0.1,
        // getPanY: d => d*0.1,
        // getScale: d=>1.2
      }],
      audios: ["Audio/evillaugh.mp3"]
    },{
      title: "C03",
      layers: ["C/C03/C03_bg.png",
      {
        src: "C/C03/C03_villain.png",
        getPanX: delta=>delta*-0.6,
        getPanY: delta=>delta*-0.4,
      },{
        src: "C/C03/C03_car.png",
        getPanX: delta=>delta*-0.6,
        getPanY: delta=>delta*-0.4
      },
      "C/C03/C03_man.png",]
    },{
      title: "C04",
      layers: ["C/C04/C04_bg.png","C/C04/C04_dialog.png"],
      audios: ["Audio/seatbelt.wav"]
    },{
      title: "C05",
      layers: ["C/C05/C05_bg.png","C/C05/C05_man.png","C/C05/C05_dialog.png","C/C05/C05_speedlines.png"],
      audios: ["Audio/engine_car.wav"]
    },

    {
      title: "D01",
      layers: ["D/D01/D01_bg.png"],
      audios: ["Audio/busycity.wav"]
    },{
      title: "D02",
      layers: ["D/D02/D02_bg.png",{
        src: "D/D02/D02_car2.png"
      },{
        src: "D/D02/D02_villain.png",
        getPanX: delta=>delta*0.55,
        getPanY: delta=>delta*-0.35

      },{
        src: "D/D02/D02_car1.png",
        getPanX: delta=>delta*0.05,
        getPanY: delta=>delta*-0.1-100
        
      },
      {
        src: "D/D02/D02_anderson.png",
        getPanX: delta=>delta*0.15-50,
        getPanY: delta=>delta*-0.05+50
      }
    ],
      audios: ["Audio/car_stopping.wav"]
    },{
      title: "D03",
      layers: ["D/D03/D03_bg.png","D/D03/D03_car_back.png",{
        src: "D/D03/D03_anderson.png",
        getPanX: (d,dp)=>d*0.5,
        getPanY: (d,dp)=>d*0.35
      },{
        src: "D/D03/D03_car_front.png",
        getPanX: (d,dp)=>d*-0.1,
        getPanY: (d,dp)=>d*0.1
      },"D/D03/D03_dialog.png"],
      audios: ["Audio/car_crash.wav"]
    },{
      title: "D04",
      layers: ["D/D04/D04_bg.png",{
        src: "D/D04/D04_car.png",
        getPanX: delta => 0,
        getPanY: delta => delta*-0.1,
        getScale: (d,dp)=> dp*0.6+1
      },"D/D04/D04_speedlines.png"]
    },
    {
      title: 'Game1',
      type: 'game',

    },

    {
      title: "E01",
      layers: ["E/E01/E01_bg.png","E/E01/E01_car.png","E/E01/E01_Anderson.png","E/E01/E01_dialog.png","E/E01/E01_bike.png"]
    },

    {
      title: "E02",
      layers: ["E/E02/E02_bg.png","E/E02/E02_dialog_1.png","E/E02/E02_dialog_2.png"]
    },
    {
      title: 'Game2',
      type: 'game',

    },


    {
      title: "F01",
      layers: ["F/F01/F01_bg.png", {
        src: "F/F01/F01_villain.png",

        getPanX: (d,dp)=>dp*-50,
        getPanY: (d,dp)=>dp*-200,
        getScale: (d,dp)=>dp*-0.6+1
      }, {
        src: "F/F01/F01_Anderson.png"
      },"F/F01/F01_dialog_1.png","F/F01/F01_dialog_2.png"]
    },
    {
      title: "F02",
      layers: ["F/F02/F02_bg.png"]
    },
    {
      title: "F03",
      layers: ["F/F03/F03_bg.png"],
      audios: ["Audio/gun2.mp3"]
    },
    {
      title: "F04",
      layers: ["F/F04/F04_1_bg.png","F/F04/F04_1_villain.png",
                "F/F04/F04_2_bg.png","F/F04/F04_2_pillar.png","F/F04/F04_2_Anderson.png"]
    },


    {
      title: "G01",
      layers: [{
        src: "G/G01/G01_bg_1.png",
        getPanX: delta =>delta* 0.1
      },{
        src: "G/G01/G01_bg_2.png",
        getPanX: delta =>delta* -0.1,
        getPanY: delta=>0
      },{
        src: "G/G01/G01_dialog_1.png",
        getPanX: delta =>delta* 0.1
      },{
        src: "G/G01/G01_dialog_2.png",
        getPanX: delta =>delta* -0.1
      }]
    },
    {
      title: "G02",
      layers: ["G/G02/G02_bg.png","G/G02/G02_car_1.png","G/G02/G02_car_2.png"],
      audios: ["Audio/carspeedup.wav"]
    },
    {
      title: "G03",
      layers: ["G/G03/G03_bg.png","G/G03/G03_car.png"],
      audios: ["Audio/carspeedup.wav"]
    },
    {
      title: "G04",
      layers: ["G/G04/G04_bg.png","G/G04/G04_dialog.png"]
    },
    {
      title: 'Game3',
      type: 'game',

    },



    {
      title: "H01",
      layers: ["H/H01/H01_bg.png"],
      audios: ["Audio/gun.mp3"]
    },
    {
      title: "H02",
      layers: ["H/H02/H02_bg.png",{
        src: "H/H02/H02_car.png",
        getPanX: (d,dp)=>d*0.1,
        getPanY: (d,dp)=>d*0.15,
        getScale: (d,dp)=>dp*0.2+0.7
      },"H/H02/H02_speedlines.png"],
      audios: ["Audio/car_stopping.wav"]
    },
    {
      title: "H03",
      layers: ["H/H03/H03_bg.png","H/H03/H03_dialog_1.png"],
      audios: ['Audio/evillaugh.mp3']
    },
    {
      title: "H04",
      layers: ["H/H04/H04_bg.png"],
      audios: ["Audio/carspeedup.wav"]
    },
    {
      title: "H05",
      layers: ["H/H05/H05_bg.png","H/H05/H05_dialog_1.png","H/H05/H05_dialog_2.png"],
      audios: ["Audio/beep.wav"]
    },
    {
      title: 'Game4',
      type: 'game',

    },



    {
      title: "I01",
      layers: ["I/I01/I01_bg.png","I/I01/I01_speedlines_back.png",{
        src: "I/I01/I01_car.png",
        getPanX: (delta)=>delta* -0.5,
        getPanY: (delta)=>delta* 0.5+100

      },"I/I01/I01_speedlines_front.png"],
      audios: ["Audio/gun.mp3"]
    },
    {
      title: "I02",
      layers: ["I/I02/I02_bg.png","I/I02/I02_box.png"],
      audios: ["Audio/gun.mp3","Audio/car_crash.wav"]
    },
    {
      title: "I03",
      layers: ["I/I03/I03_bg.png"]
    },
    {
      title: "I04",
      layers: ["I/I04/I04_bg.png"],
      audios: ["Audio/car_stopping.wav"]
    },
    {
      title: "I05",
      layers: ["I/I05/I05_bg.png"],
      audios: ["Audio/carcrash2.wav"]
    },
    {
      title: "I06",
      layers: ["I/I06/I06_bg.png",{
        src: "I/I06/I06_anderson.png",
        getPanX: (d,dp)=>d*-0.3
      }],
      audios: ["Audio/car_crash.wav"]
    },
    {
      title: "I07",
      layers: ["I/I07/I07_bg.png","I/I07/I07_dialog.png","I/I07/I07_villain.png"]
    },
    {
      title: "I09",
      layers: ["I/I09/I09_bg.png",{
        src: "I/I09/I09_button_1.png",
        getPanX: d=>0,
        getPanY: d=>0,
      },{
        src: "I/I09/I09_button_2.png",
        getPanX: d=>0,
        getPanY: d=>0,
      },"I/I09/I09_text.png"]
    },

  ]
}