function drawVizzes(barDirection) {
    const techChart = echarts.init(document.getElementById('technical-proficiencies-viz')),
        bizChart = echarts.init(document.getElementById('business-proficiencies-viz')),
        scatterChart = echarts.init(document.getElementById('scatter-viz')),
        mapChart = echarts.init(document.getElementById('map-viz'));

    let barData = [],
        bizData = [],
        barLabels = [],
        bizLabels = [],
        mapData = [],
        techOption,
        businessOption,
        scatterOption,
        mapOption;

    if (barDirection === 'asc') {
        barData = [7, 7, 7, 8, 8, 8, 9, 9, 9, 10];
        barLabels = ['AWS', 'C/C++', 'Hadoop/HDFS', 'Java', 'Linux', 'Python', 'CSS', 'HTML', 'SQL', 'JavaScript'];
        bizData = [7, 8, 9, 9, 9, 9, 9, 9, 10];
        bizLabels = ['Financial Analysis', 'Agile/Scrum', 'Cross-Collaboration', 'Interaction Design', 'Market Research', 'UI/UX', 'User Research', 'Strategy', 'Data Analysis'];
    } else if (barDirection === 'desc') {
        barData = [10, 9, 9, 9, 8, 8, 8, 7, 7, 7];
        barLabels = ['JavaScript', 'CSS', 'HTML', 'SQL', 'Java', 'Linux', 'Python', 'AWS', 'C/C++', 'Hadoop/HDFS'];
        bizData = [10, 9, 9, 9, 9, 9, 9, 8, 7];
        bizLabels = ['Data Analysis', 'Cross-Collaboration', 'Interaction Design', 'Market Research', 'UI/UX', 'User Research', 'Strategy', 'Agile/Scrum', 'Financial Analysis'];
    }

    barOption = {
        color: ['#4FA4DE'],
        toolbox: {
            feature: {
                magicType: {
                    show: true,
                    type: ['line', 'bar'],
                    title: {
                        line: 'Line',
                        bar: 'Bar'
                    },
                    icon: {
                        line: 'path://"M95,92.5c0,1.4-1.1,2.5-2.5,2.5H18.8C11.2,95,5,88.8,5,81.2V7.5C5,6.1,6.1,5,7.5,5S10,6.1,10,7.5v73.7c0,4.9,4,8.8,8.8,8.8  h73.7C93.9,90,95,91.1,95,92.5z M33.8,77.5c6.1,0,11-4.9,11-11c0-1-0.1-2-0.4-2.9L58,57.2c2,2.6,5.2,4.3,8.7,4.3c6.1,0,11-4.9,11-11  c0-3-1.2-5.6-3.1-7.6l6.1-13.8c0.9,0.3,1.9,0.4,2.9,0.4c6.1,0,11-4.9,11-11s-4.9-11-11-11s-11,4.9-11,11c0,3.6,1.8,6.8,4.5,8.8  l-5.9,13.2c-1.4-0.7-3-1-4.6-1c-6.1,0-11,4.9-11,11c0,1.1,0.2,2.1,0.4,3.1L42.6,60c-2-2.7-5.2-4.5-8.9-4.5c-6.1,0-11,4.9-11,11  S27.7,77.5,33.8,77.5z',
                        bar: 'path://M96,93c0,1.1-0.9,2-2,2H6V7c0-1.1,0.9-2,2-2s2,0.9,2,2v84h84C95.1,91,96,91.9,96,93z M18,88h10c1.7,0,3-1.3,3-3V48  c0-1.7-1.3-3-3-3H18c-1.7,0-3,1.3-3,3v37C15,86.7,16.3,88,18,88z M38,88h10c1.7,0,3-1.3,3-3V27c0-1.7-1.3-3-3-3H38c-1.7,0-3,1.3-3,3  v58C35,86.7,36.3,88,38,88z M58,88h10c1.7,0,3-1.3,3-3V37c0-1.7-1.3-3-3-3H58c-1.7,0-3,1.3-3,3v48C55,86.7,56.3,88,58,88z M78,88h10  c1.7,0,3-1.3,3-3V17c0-1.7-1.3-3-3-3H78c-1.7,0-3,1.3-3,3v68C75,86.7,76.3,88,78,88z'
                    }
                }
            }
        },
        title: {
            text: 'Technical Proficiences',
            subtext: 'my geeky side',
            x: 'center',
            textStyle: {
                fontFamily: 'HelveticaNeue-UltraLight, Helvetica Neue UltraLight, Helvetica Neue, Arial, Helvetica, sans-serif'
            }
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            },
            formatter: (d) => {
                const data = d[0];
                let returnArr = [];

                if (data.axisValue === 'JavaScript' || data.axisValue === 'HTML' || data.axisValue === 'CSS') {
                    returnArr.push(
                        '<b style="color: white;">' + data.axisValue + '</b>: ' + data.data + '<br>'
                    );
                    returnArr.push(
                        'Professional Experience'
                    );
                } else if (data.axisValue === 'Java' || data.axisValue === 'SQL' || data.axisValue === 'Python') {
                    returnArr.push(
                        '<b style="color: white;">' + data.axisValue + '</b>: ' + data.data + '<br>'
                    );
                    returnArr.push(
                        'College and Professional Experience'
                    );
                } else {
                    returnArr.push(
                        '<b style="color: white;">' + data.axisValue + '</b>: ' + data.data + '<br>'
                    );
                    returnArr.push(
                        'College Experience'
                    );
                }

                return returnArr.join('');
            },
            textStyle: {
                fontFamily: 'HelveticaNeue-UltraLight, Helvetica Neue UltraLight, Helvetica Neue, Arial, Helvetica, sans-serif'
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                data: barLabels,
                nameTextStyle: {
                    fontFamily: 'HelveticaNeue-UltraLight, Helvetica Neue UltraLight, Helvetica Neue, Arial, Helvetica, sans-serif'
                }
            }
        ],
        yAxis: [
            {
                type: 'value',
                nameTextStyle: {
                    fontFamily: 'HelveticaNeue-UltraLight, Helvetica Neue UltraLight, Helvetica Neue, Arial, Helvetica, sans-serif'
                }
            }
        ],
        series: [
            {
                type: 'bar',
                data: barData,
                cursor: 'default'
            }
        ]
    };

    businessOption = {
        color: ['#1A936F'],
        title: {
            text: 'Business Proficiences',
            subtext: 'my professional side',
            x: 'center',
            textStyle: {
                fontFamily: 'HelveticaNeue-UltraLight, Helvetica Neue UltraLight, Helvetica Neue, Arial, Helvetica, sans-serif'
            }
        },
        toolbox: {
            feature: {
                magicType: {
                    show: true,
                    type: ['line', 'bar'],
                    title: {
                        line: 'Line',
                        bar: 'Bar'
                    },
                    icon: {
                        line: 'path://"M95,92.5c0,1.4-1.1,2.5-2.5,2.5H18.8C11.2,95,5,88.8,5,81.2V7.5C5,6.1,6.1,5,7.5,5S10,6.1,10,7.5v73.7c0,4.9,4,8.8,8.8,8.8  h73.7C93.9,90,95,91.1,95,92.5z M33.8,77.5c6.1,0,11-4.9,11-11c0-1-0.1-2-0.4-2.9L58,57.2c2,2.6,5.2,4.3,8.7,4.3c6.1,0,11-4.9,11-11  c0-3-1.2-5.6-3.1-7.6l6.1-13.8c0.9,0.3,1.9,0.4,2.9,0.4c6.1,0,11-4.9,11-11s-4.9-11-11-11s-11,4.9-11,11c0,3.6,1.8,6.8,4.5,8.8  l-5.9,13.2c-1.4-0.7-3-1-4.6-1c-6.1,0-11,4.9-11,11c0,1.1,0.2,2.1,0.4,3.1L42.6,60c-2-2.7-5.2-4.5-8.9-4.5c-6.1,0-11,4.9-11,11  S27.7,77.5,33.8,77.5z',
                        bar: 'path://M96,93c0,1.1-0.9,2-2,2H6V7c0-1.1,0.9-2,2-2s2,0.9,2,2v84h84C95.1,91,96,91.9,96,93z M18,88h10c1.7,0,3-1.3,3-3V48  c0-1.7-1.3-3-3-3H18c-1.7,0-3,1.3-3,3v37C15,86.7,16.3,88,18,88z M38,88h10c1.7,0,3-1.3,3-3V27c0-1.7-1.3-3-3-3H38c-1.7,0-3,1.3-3,3  v58C35,86.7,36.3,88,38,88z M58,88h10c1.7,0,3-1.3,3-3V37c0-1.7-1.3-3-3-3H58c-1.7,0-3,1.3-3,3v48C55,86.7,56.3,88,58,88z M78,88h10  c1.7,0,3-1.3,3-3V17c0-1.7-1.3-3-3-3H78c-1.7,0-3,1.3-3,3v68C75,86.7,76.3,88,78,88z'
                    }
                }
            }
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            },
            formatter: (d) => {
                const data = d[0];
                let returnArr = [];

                if (data.axisValue === 'UI/UX' || data.axisValue === 'Interaction Design' || data.axisValue === 'User Research' || data.axisValue === 'Agile/Scrum') {
                    returnArr.push(
                        '<b style="color: white;">' + data.axisValue + '</b>: ' + data.data + '<br>'
                    );
                    returnArr.push(
                        'Professional Experience'
                    );
                } else if (data.axisValue === 'Data Analysis' || data.axisValue === 'Market Research' || data.axisValue === 'Strategy' || data.axisValue === 'Cross-Collaboration') {
                    returnArr.push(
                        '<b style="color: white;">' + data.axisValue + '</b>: ' + data.data + '<br>'
                    );
                    returnArr.push(
                        'College and Professional Experience'
                    );
                } else {
                    returnArr.push(
                        '<b style="color: white;">' + data.axisValue + '</b>: ' + data.data + '<br>'
                    );
                    returnArr.push(
                        'College Experience'
                    );
                }

                return returnArr.join('');
            },
            textStyle: {
                fontFamily: 'HelveticaNeue-UltraLight, Helvetica Neue UltraLight, Helvetica Neue, Arial, Helvetica, sans-serif'
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                data: bizLabels,
                nameTextStyle: {
                    fontFamily: 'HelveticaNeue-UltraLight, Helvetica Neue UltraLight, Helvetica Neue, Arial, Helvetica, sans-serif'
                }
            }
        ],
        yAxis: [
            {
                type: 'value',
                nameTextStyle: {
                    fontFamily: 'HelveticaNeue-UltraLight, Helvetica Neue UltraLight, Helvetica Neue, Arial, Helvetica, sans-serif'
                }
            }
        ],
        series: [
            {
                type: 'bar',
                data: bizData,
                cursor: 'default'
            }
        ]
    };

    scatterOption = {
        color: ['#B2CDF4'],
        tooltip: {
            formatter: (d) => {
                const data = d;
                let returnArr = [];

                if (data.name === '2011') {
                    returnArr.push(
                        '<b style="color: white;">' + data.name + '</b><br>High School Graduation<br>'
                    );
                } else if (data.name === '2015') {
                    returnArr.push(
                        '<b style="color: white;">' + data.name + '</b><br>College Graduation<br>'
                    );
                } else if (data.name === '2016') {
                    returnArr.push(
                        '<b style="color: white;">' + data.name + '</b><br>Booz Allen<br>'
                    );
                } else if (data.name === '2017') {
                    returnArr.push(
                        '<b style="color: white;">' + data.name + '</b><br>Deloitte<br>'
                    );
                }

                return returnArr.join('');
            },
            textStyle: {
                fontFamily: 'HelveticaNeue-UltraLight, Helvetica Neue UltraLight, Helvetica Neue, Arial, Helvetica, sans-serif'
            }
        },
        title: {
            text: 'My Professional Journey',
            subtext: 'Click on a bubble to bring up more information',
            x: 'center',
            textStyle: {
                fontFamily: 'HelveticaNeue-UltraLight, Helvetica Neue UltraLight, Helvetica Neue, Arial, Helvetica, sans-serif'
            }
        },
        singleAxis: {
            left: 50,
            right: 50,
            top: 60,
            type: 'category',
            boundaryGap: false,
            data: ['2011', '2015', '2016', '2017'],
            nameTextStyle: {
                fontFamily: 'HelveticaNeue-UltraLight, Helvetica Neue UltraLight, Helvetica Neue, Arial, Helvetica, sans-serif'
            }
        },
        series: {
            singleAxisIndex: 0,
            coordinateSystem: 'singleAxis',
            type: 'scatter',
            data: [[0, 0], [1, 0], [2, 0], [3, 0]],
            symbolSize: 50
        }
    }

    mapData = [
        {
            name: 'Sunnyside, WA',
            latitude: 46.3237,
            longitude: -120.0087,
            value: 5,
            color: '#B2CDF4'
        },
        {
            name: 'The Woodlands, TX',
            latitude: 30.1658,
            longitude: -95.4613,
            value: 5,
            color: '#4FA4DE'
        },
        {
            name: 'Washington, DC',
            latitude: 39,
            longitude: -78.5,
            value: 5,
            color: '#1A936F'
        },
        {
            name: 'Baltimore, MD',
            latitude: 40,
            longitude: -77,
            value: 5,
            color: '#4FA4DE'
        },
        {
            name: 'San Antonio, TX',
            latitude: 29.4241,
            longitude: -98.4936,
            value: 5,
            color: '#B2CDF4'
        }
    ];

    mapOption = {
        backgroundColor: '#404a59',
        legend: {
            left: 'left',
            data: ['Family', 'School', 'Professional'],
            textStyle: {
                color: '#fff'
            }
        },
        title: {
            text: 'About Me',
            subtext: 'Hover over the dots to show text',
            left: 'center',
            top: 'top',
            textStyle: {
                color: '#fff',
                fontFamily: 'HelveticaNeue-UltraLight, Helvetica Neue UltraLight, Helvetica Neue, Arial, Helvetica, sans-serif'
            }
        },
        tooltip: {
            trigger: 'item',
            formatter: (data) => {
                let tooltip = [];

                if (data.name === 'Sunnyside, WA') {
                    tooltip.push(
                        '<b style="color: white;">Sunnyside, WA</b><br>',
                        'I was born here in 1993 and lived here until<br>',
                        'about 6th grade when I moved to Texas.'
                    )
                } else if (data.name === 'San Antonio, TX') {
                    tooltip.push(
                        '<b style="color: white;">San Antonio, TX</b><br>',
                        'This is where my family currently lives. I find myself<br>',
                        'getting to know the city more and more when I visit.'
                    )
                } else if (data.name === 'The Woodlands, TX') {
                    tooltip.push(
                        '<b style="color: white;">The Woodlands, TX</b><br>',
                        'This is where I grew up - my hometown. I graduated<br>',
                        'high school in 2011 and still visit from time to time.'
                    )
                } else if (data.name === 'Baltimore, MD') {
                    tooltip.push(
                        '<b style="color: white;">Baltimore, MD</b><br>',
                        'This is where I attended college - at The Johns Hopkins<br>',
                        'University. I graduated in 2015 with degrees in BME and CS.'
                    )
                } else if (data.name === 'Washington, DC') {
                    tooltip.push(
                        '<b style="color: white;">Washington, DC</b><br>',
                        'This is where I am currently located. My first job after<br>',
                        'college was with Booz Allen. In 2016 I accepted a role with Deloitte.'
                    )
                }

                return tooltip.join('');
            },
            position: () => {
                if ($(window).width() < 1290) {
                    return ['-25%', '80%'];
                }
            },
            textStyle: {
                fontFamily: 'HelveticaNeue-UltraLight, Helvetica Neue UltraLight, Helvetica Neue, Arial, Helvetica, sans-serif'
            }
        },
        geo: {
            name: 'About Me',
            type: 'map',
            map: 'world',
            roam: false,
            label: {
                emphasis: {
                    show: false
                }
            },
            itemStyle: {
                normal: {
                    areaColor: '#323c48',
                    borderColor: '#111'
                },
                emphasis: {
                    areaColor: '#323c48'
                }
            },
            center: [-96.5, 37.5],
            zoom: 7
        },
        series: [
            {
                type: 'scatter',
                coordinateSystem: 'geo',
                data: mapData.map((item) => {
                    return {
                        name: item.name,
                        value: [
                            item.longitude,
                            item.latitude,
                            item.value
                        ],
                        label: {
                            emphasis: {
                                position: 'right',
                                show: false
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: item.color
                            }
                        },
                        symbolSize: 15
                    };
                })
            }
        ]
    }

    mapChart.setOption(mapOption);
    mapChart.resize();

    techChart.setOption(barOption);
    techChart.resize();
    bizChart.setOption(businessOption);
    bizChart.resize();

    scatterChart.setOption(scatterOption);
    scatterChart.on('click', (d) => {
        let div = document.getElementById('about-me-text');
        div.innerHTML = '';

        setTimeout(() => {
            if (d.name === '2011') {
                div.innerHTML = '<div style="text-align: center; width: 100%; margin-top: 2%; margin-bottom: 2%; font-size: 1.2em;">' +
                    '<b style="text-align: center;">High School Graduation</b>' +
                    '</div>' +
                    'In 2011 I graduated high school in Texas and embarked on my college/professional journey. Here are some highlights:<br>' +
                    '<ul>' +
                    '	<li>' + 'Graduated high school in the top 5% of my class' + '</li>' +
                    '	<li>' + 'While in high school I completed several internships at the Johns Hopkins School of Medicine where I did research primarily related to Genetics and Genomics' + '</li>' +
                    '	<li>' + 'Played in various sports including varsity football' + '</li>' +
                    '	<li>' + 'Was named a Gates Millenium Scholar Finalist' + '</li>' +
                    '</ul>';
            } else if (d.name === '2015') {
                div.innerHTML = '<div style="text-align: center; width: 100%; margin-top: 2%; margin-bottom: 2%; font-size: 1.2em;">' +
                    '<b style="text-align: center;">College Graduation</b>' +
                    '</div>' +
                    'In 2015 I graduated from the Johns Hopkins University with degrees in Biomedical Engineering and Computer Science. Here are some highlights:<br>' +
                    '<ul>' +
                    '	<li>' + 'Participated in two BME design projects which resulted in being authored in a <a href="http://journals.plos.org/plosone/article?id=10.1371/journal.pone.0151789">scientific journal</a>, speaking at conferences, and <a href="https://www.bme.jhu.edu/news-events/news/spirosense-offers-hope-to-patients-with-respiratory-illness/">winning over $50,000 in prize money</a>' + '</li>' +
                    '	<li>' + 'Interned at a <a href="https://www.tissue-analytics.com/#page=home">MedTech startup</a> as a Mobile Software Engineer (Android)' + '</li>' +
                    '	<li>' + 'Co-founded the Johns Hopkins Undergraduate Consulting Club' + '</li>' +
                    '	<li>' + 'Named a Bloomberg Scholar' + '</li>' +
                    '</ul>';
            } else if (d.name === '2016') {
                div.innerHTML = '<div style="text-align: center; width: 100%; margin-top: 2%; margin-bottom: 2%; font-size: 1.2em;">' +
                    '<b style="text-align: center;">Booz Allen</b>' +
                    '</div>' +
                    'After graduation I took my first job with Booz Allen Hamilton as an Analyst in their Strategic Innovation Group. Whilte at Booz Allen I was able to work on some great technical and analytics projects. Here are some highlights:<br>' +
                    '<ul>' +
                    '	<li>' + 'Worked on an analytics engagement helping a hospital predict patient readmission rates' + '</li>' +
                    '	<li>' + '<a href="https://www.boozallen.com/content/dam/boozallen/documents/Viewpoints/2016/03/the-challenge-of-sports-science.pdf">' +
                    'Co-authored a white paper </a>focused on the challenges facing sports teams in the field of sports science' + '</li>' +
                    '	<li>' + 'Worked on a federal health engagement assessing over 9,000 medical records using programming languages such as SQL, VB.NET, and SAS in order to estimate prescription drug overpayments for the Federal Government' + '</li>' +
                    '	<li>' + 'Programmed a software prototype that scraped Google search result data and analyzed it in order to predict trends in public health' + '</li>' +
                    '</ul>';
            } else if (d.name === '2017') {
                div.innerHTML = '<div style="text-align: center; width: 100%; margin-top: 2%; margin-bottom: 2%; font-size: 1.2em;">' +
                    '<b style="text-align: center;">Deloitte</b>' +
                    '</div>' +
                    'In 2016 I transitioned from Booz Allen to a role at Deloitte as a Technology Consultant. My experience here has been truly amazing and I have met some exceptional people in the process. Here are some highlights:<br>' +
                    '<ul>' +
                    '	<li>' + 'Serve as a Front-End Software Engineer on the <a href="http://semoss.org/">SEMOSS platform</a>. SEMOSS is a web-based, end-to-end data analytics platform' + '</li>' +
                    '	<li>' + 'Assisted a federal client in assessing over $400 MM worth of technology systems to find redundancies and identify cost-savings' + '</li>' +
                    '	<li>' + 'Helped a <a href="http://www.samagra.co/">social enterprise based in Pune, India</a> assess their short-and-long-term technology integration strategy as part of a <a href="https://www2.deloitte.com/lk/en/pages/about-deloitte/articles/d2international.html">Deloitte Social Impact Fellowship</a>' + '</li>' +
                    '	<li>' + 'Worked on a 3-person team to revamp the business plan for a local D.C. non-profit in the insurance space' + '</li>' +
                    '</ul>';
            }
            div.className += ' load';
        });
    });

    scatterChart.resize();
}