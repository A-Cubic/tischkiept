import initCalendar, {
  enableArea,
  setTodoLabels,
  setSelectedDays
} from '../../component/calendar/main.js';

const conf = {
  data:{
    chooseData:'',
  },
  onLoad:function(options){
    console.log(options)
    this.setData({
      chooseData: options.time
    })
  },
  onShow: function() {
    const that = this;
    initCalendar({
      disablePastDay: true,
      afterTapDay: (currentSelect, allSelectedDays) => {
        console.log('currentSelect', currentSelect)
        let clickData,showData;
        if (currentSelect.month<10){
          if (currentSelect.day<10){
            clickData = currentSelect.year.toString() + 0 + currentSelect.month.toString() + 0 + currentSelect.day.toString()
            showData = 0 + currentSelect.month.toString() + '月' + 0 + currentSelect.day.toString() + '日'
          }else{
            clickData = currentSelect.year.toString() + 0 + currentSelect.month.toString() + currentSelect.day.toString()
            showData = 0 + currentSelect.month.toString() + '月' +  currentSelect.day.toString() + '日'
          }
        } else{
          if (currentSelect.day < 10) {
            clickData = currentSelect.year.toString() + currentSelect.month.toString() + 0 + currentSelect.day.toString()
            showData =  currentSelect.month.toString() + '月' + 0 + currentSelect.day.toString() + '日'
          } else {
            clickData = currentSelect.year.toString() + currentSelect.month.toString() + currentSelect.day.toString()
            showData =  currentSelect.month.toString() + '月' +  currentSelect.day.toString() + '日'
          }
        }
        // console.log('~~~', clickData)
        // console.log('~~~', showData)

        let pages = getCurrentPages();
        let prevPage = pages[pages.length - 2]
        prevPage.setData({  // 将我们想要传递的参数在这里直接setData。上个页面就会执行这里的操作。
          today: showData,
          paramsData: clickData
        })
        
        // console.log('pages', pages)
        wx.navigateBack({
          delta:1
        })
      },
      afterCalendarRender(ctx) {
        // enableArea([that.data.chooseData, '']);
        
        // const data = [
        //   {
        //     year: '2019',
        //     month: '3',
        //     day: '15'
        //   },
        //   {
        //     year: 2019,
        //     month: 3,
        //     day: 18,
        //     todoText: '待办'
        //   }
        // ];
        // 异步请求
        // setTimeout(() => {
        //   setTodoLabels({
        //     pos: 'bottom',
        //     dotColor: '#40',
        //     days: data
        //   });
        // }, 1000);
        // enableArea(['2018-10-7', '2018-10-28']);
        // setTimeout(() => {
        //   setSelectedDays(data);
        // }, 2000);
      }
    });
  }
};

Page(conf);
