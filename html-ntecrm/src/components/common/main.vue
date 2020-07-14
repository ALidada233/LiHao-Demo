<template>
	<div>
		<!-- <nav-title></nav-title> -->
		<transition name="fade-transform" mode="out-in">
			<router-view class="content-shadow" v-if="$root.isRouterAlive"></router-view>
		</transition>
	</div>
</template>
<script type="text/javascript">
// import navTitle from "@/components/common/navTitle"
import home from "@/page/admin/home/index"
	export default{
		name:"Main",
		data(){
			return{
				 
			}
		},
		watch:{
		  
		},
		methods: {
		
		},
		mounted(){
			
		},
		components:{
			// navTitle,
			home
		}

	}
</script>

<style lang="scss" scoped>
.content-shadow{
	box-shadow: 0px 0px 10px #eee;
}
.fade-transform-leave-active,
.fade-transform-enter-active {
  transition: all .2s;
}
.fade-transform-enter {
  opacity: 0;
  transform: translateX(-30px);
}
.fade-transform-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>