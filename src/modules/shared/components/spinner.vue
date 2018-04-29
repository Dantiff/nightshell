<!-- <template>
  <component :is="SPINNERS.BUBBLES"></component>
</template>
<script>
  const SPINNERS = {
  	BUBBLES: {
  		render(createElement) {
  			return createElement(
				'span',
				{
  					attrs: {
  						class: 'loading-bubbles',
  					},
  				},
				Array.apply(Array, Array(8)).map(() =>
					createElement('span', {
  						attrs: {
  							class: 'bubble-item',
  						},
  					})
				)
  			);
  		},
  	},
  };
  export default {
  	name: 'spinner',
  };
</script>
<style lang="stylus" scoped>

deep = '~>>>'

.loading-bubbles
  size = 1px
  radius = 12px
  shallow = 3px
  c-basic = #666
  {deep} .bubble-item 
    background c-basic
    animation loading-bubbles linear .75s infinite
    &:first-child 
      margin-top -size/2 - radius
      margin-left -size/2
    
    &:nth-child(2) 
      margin-top -size/2 + (-radius * 0.73)
      margin-left -size/2 + radius * .73
    
    &:nth-child(3) 
      margin-top -size/2
      margin-left -size/2 + radius
    
    &:nth-child(4) 
      margin-top -size/2 + radius * .73
      margin-left -size/2 + radius * .73
    
    &:nth-child(5) 
      margin-top -size/2 + radius
      margin-left -size/2
    
    &:nth-child(6) 
      margin-top -size/2 + radius * .73
      margin-left -size/2 + -radius * .73
    
    &:nth-child(7) 
      margin-top -size/2
      margin-left -size/2 + -radius
    
    &:last-child 
      margin-top -size/2 + -radius * .73
      margin-left -size/2 + -radius * .73
    
  
  @keyframes loading-bubbles 
    0% 
      width size
      height size
      box-shadow 0 0 0 shallow c-basic
    
    90% 
      width size
      height size
      box-shadow 0 0 0 0 c-basic
    
    100% 
      width size
      height size
      box-shadow 0 0 0 shallow c-basic
    
  


// default spinner
.loading-default 
  position relative
  border 1px solid #999
  animation loading-rotating ease 1.5s infinite
  &:before 
    size 6px
    content ''
    position absolute
    display block
    top 0
    left 50%
    margin-top -size/2
    margin-left -size/2
    width size
    height size
    background-color #999
    border-radius 50%
  


// rotate animation
@keyframes loading-rotating 
  0%
    transform rotate(0)
  
  100%
    transform rotate(360deg)
  


.loading-bubbles
  position relative

.loading-bubbles {deep} .bubble-item 
  delay = .093s
  position absolute
  top 50%
  left 50%
  display inline-block
  border-radius 50%
  &:nth-child(2) 
    animation-delay delay
  
  &:nth-child(3) 
    animation-delay delay * 2
  
  &:nth-child(4) 
    animation-delay delay * 3
  
  &:nth-child(5) 
    animation-delay delay * 4
  
  &:nth-child(6) 
    animation-delay delay * 5
  
  &:nth-child(7) 
    animation-delay delay * 6
  
  &:last-child 
    animation-delay delay * 7
  

</style> -->