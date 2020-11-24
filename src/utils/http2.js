
const baseUrl = "https://master.jiaju01.com"
export const myRequest = (options)=>{
	return new Promise((resolve,reject)=>{
		uni.request({
			method: options.method,
			data: options.data,
			url: baseUrl+options.url,
			success(res) {
				// if(res.data.status !== 200) {
				// 	return uni.showToast({
				// 		title: '获取数据失败'
				// 	})
				// }
				resolve(res.data)
			},
			fail(err) {
				uni.showToast({
					title: '获取数据失败'
				})
				reject(err)
			}
		})
	})
}