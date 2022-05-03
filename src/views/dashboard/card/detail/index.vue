<template>
  <div>
      <div class="card-header">
        <span>{{title}}</span>
        <svg t="1651562380734" class="icon" viewBox="0 0 1026 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4021" width="16" height="16">
            <path d="M547.7 333c0-24.7-20-44.7-44.7-44.7s-44.7 20-44.7 44.7c0 24.7 20 44.7 44.7 44.7C527.7 377.7 547.7 357.7 547.7 333zM452.5 702.8c8.1 7 18.5 8.1 26.2 7.2 4.7-0.6 9.8-2 11.7-2.5l75.4-25.5c16.2-5.4 24.1-16.1 18.3-34.9-5.8-16.2-19.3-20.6-32.4-17.4L510 641.3l38.8-183.5c1.7-8.2 0.4-21-8.2-30.2-7.8-8.3-20.7-9.6-28.9-7.5L440 444.4c-13 3.3-20 20.2-16.5 33.2 4.7 17.3 18.2 23.4 31.2 20.1l31.4-9.5-40 191C444.3 687.3 446.5 697.1 452.5 702.8z" p-id="4022" fill="#8a8a8a"></path>
            <path d="M885.76 498.176c0 213.504-173.056 386.56-386.56 386.56S112.64 711.68 112.64 498.176s173.056-386.56 386.56-386.56S885.76 284.672 885.76 498.176zM499.712 169.984c-175.616 0-329.728 154.112-329.728 329.216 0 182.272 147.456 329.728 329.728 329.728s329.728-147.456 329.728-329.728C829.952 325.12 677.888 169.984 499.712 169.984z" p-id="4023" fill="#8a8a8a"></path>
        </svg>
      </div>
      <div class="card-content">
          <span>{{count}}</span>
      </div>
      <div class="card-charts">
          <slot name="charts"></slot>
      </div>
      <div class="card-footer">
          <slot name="footer"></slot>
      </div>
  </div>
</template>

<script>
export default {
    name: 'Detail',
    props: ['title','count']
}
</script>

<style scoped>
 .card-header{
     /* 弹性布局 */
     display: flex;
     justify-content: space-between;
     color: #d9d9d9;
     font-size: 15px;
 }
 .card-content{
     font-size: 22px;
     padding: 10px 0px;
 }
 .card-charts{
     height: 50px;
 }
 .card-footer{
     border-top: 1px solid #eee;
     padding-top: 10px;
 }
</style>