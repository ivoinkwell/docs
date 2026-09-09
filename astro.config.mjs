// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightThemeNova from 'starlight-theme-nova'

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			plugins: [starlightThemeNova(/* options */), ],
			title: 'Inkwell Notes',
			description: 'Notes with Ink',
			social: [
				{ icon: 'github', label: 'GitHub', href: 'https://github.com/ivoink/docs', },
				{ icon: 'document', label: 'Blog', href: 'https://ivoinkwell.xyz', },
			],
			// components: {
			// 	SocialIcons: './src/components/SocialIcons.astro',
			// },
			locales: {
				root: {
					label: '简体中文',
					lang: 'zh-CN',
				},
			},
			head: [
				{
					tag: 'link',
					attrs: {
						rel: 'icon',
						type: 'image/png',
						sizes: '16x16',
						href: '/favicon-16x16.png',
					},
				},
				{
					tag: 'link',
					attrs: {
						rel: 'icon',
						type: 'image/png',
						sizes: '32x32',
						href: '/favicon-32x32.png',
					},
				},
				{
					tag: 'link',
					attrs: {
						rel: 'icon',
						type: 'image/png',
						sizes: '48x48',
						href: '/favicon-48x48.png',
					},
				},
				{
					tag: 'link',
					attrs: {
						rel: 'apple-touch-icon',
						sizes: '180x180',
						href: '/apple-touch-icon.png',
					},
				},
				{
					tag: 'link',
					attrs: {
						rel: 'apple-touch-icon',
						sizes: '152x152',
						href: '/apple-touch-icon-152x152.png',
					},
				},
				{
					tag: 'link',
					attrs: {
						rel: 'apple-touch-icon',
						sizes: '167x167',
						href: '/apple-touch-icon-167x167.png',
					},
				},
				{ tag: 'link', attrs: { rel: 'manifest', href: '/site.webmanifest' } },
				{ tag: 'meta', attrs: { name: 'theme-color', content: '#ffffff' } },
				{
					tag: 'meta',
					attrs: { name: 'msapplication-config', content: '/browserconfig.xml' },
				},
				{ tag: 'script', attrs: { src: '/open-external-links.js', defer: true } },
			],
			sidebar: [
				{
					label: 'Python 学习笔记',
					collapsed: true,
					items: [
						{ label: '总览', link: '/python-study-notes/' },
						{ label: '01 - Python及开发环境安装', link: '/python-study-notes/01-python-and-development-environment-installation/' },
						{ label: '02 - Python输入输出与变量', link: '/python-study-notes/02-python-input-output-and-variables/' }
					],
				},
				{
					label: 'Web 前端学习笔记',
					collapsed: true,
					items: [
						{ label: '总览', link: '/web-frontend/' },
						{ label: '01 - 掌握盒子模型', link: '/web-frontend/01-html-and-css-basics/' },
						{ label: '02 - CSS选择器', link: '/web-frontend/02-css-selectors/' },
						{ label: '03 - 盒子模型与布局', link: '/web-frontend/03-css-box-model-and-layout/' },
						{ label: '04 - 深入理解盒子模型', link: '/web-frontend/04-css-box-model-deep-dive/' },
						{ label: '05 - 相对定位', link: '/web-frontend/05-css-relative-positioning/' },
						{ label: '06 - 绝对定位', link: '/web-frontend/06-css-absolute-positioning/' },
						{ label: '07 - 固定定位', link: '/web-frontend/07-css-fixed-positioning/' },
						{ label: '08 - Flex布局', link: '/web-frontend/08-flex-layout/' },
						{ label: '09 - Grid布局', link: '/web-frontend/09-grid-layout/' },
						{ label: '10 - 多列布局', link: '/web-frontend/10-css-multi-column-layout/' },
						{ label: '11 - transition动画', link: '/web-frontend/11-css-transition/' },
						{ label: '12 - transform形变', link: '/web-frontend/12-css-transform/' },
						{ label: '13 - animation动画', link: '/web-frontend/13-css-animation-complex-transitions/' },
						{ label: '14 - 网页与JavaScript', link: '/web-frontend/14-javascript-and-the-web/' },
						{ label: '15 - 变量与运算', link: '/web-frontend/15-javascript-variables-and-operators/' },
						{ label: '16 - 条件与循环', link: '/web-frontend/16-javascript-conditionals-and-loops/' },
						{ label: '17 - switch语句', link: '/web-frontend/17-javascript-switch/' },
						{ label: '18 - 函数', link: '/web-frontend/18-javascript-functions/' },
						{ label: '19 - 数组与对象', link: '/web-frontend/19-javascript-arrays-two-dimensional-arrays-and-objects/' },
					],
				},
				{
					label: '软件测试学习笔记',
					collapsed: true,
					items: [
						{ label: '总览', link: '/software-testing-study-notes/' },
						{ label: '01 - 根据需求说明书编写测试用例', link: '/software-testing-study-notes/01-write-test-cases-based-on-the-requirements-specification/' },
						{ label: '02 - 利用等价类划分编写测试用例', link: '/software-testing-study-notes/02-write-test-cases-using-equivalence-class-division/' },
					],
				},
				{
					label: 'Linux',
					collapsed: true,
					items: [
						{ label: '总览', link: '/linux-system/' },
						{ label: '01 - Linux 安装与远程登录', link: '/linux-system/01-linux-installation-and-remote-login/' },
						{ label: '02 - 软件与软件源', link: '/linux-system/02-software-and-software-sources/' },
						{ label: '03 - 用户类型和用户权限', link: '/linux-system/03-user-types-and-user-permissions/' },
						{ label: '04 - 文件编辑与操作', link: '/linux-system/04-file-editing-and-operation/' },
						{ label: '05 - 系统与服务', link: '/linux-system/05-system-and-services/' },
						{ label: '06 - Linux 系统配置与安全', link: '/linux-system/06-configuration-and-security/' },
						{ label: '07 - 网络配置与管理', link: '/linux-system/07-network-configuration-and-management/' },
						{ label: '08 - 进程管理与日志排查', link: '/linux-system/08-process-management-and-log-troubleshooting/' },
						{ label: '09 - 磁盘与存储管理', link: '/linux-system/09-disk-and-storage-management/' },
					],
				},
				{
					label: '搭建自己的 Linux 开发环境',
					collapsed: true,
					items: [
						{ label: '总览', link: '/build-linux-development-enviroment/' },
						{ label: '01 - 安装 Debian 13', link: '/build-linux-development-enviroment/01-install-debian-13/' },
						{ label: '02 - 基础组件与安装', link: '/build-linux-development-enviroment/02-basic-components-and-installation/' },
						{ label: '03 - 配置你自己的 i3-wm', link: '/build-linux-development-enviroment/03-configure-your-i3-wm/' },
						{ label: '04 - i3 工具补全与配置', link: '/build-linux-development-enviroment/04-i3-wm-tools-completion-and-configurations/' },
						{ label: '05 - 应用软件', link: '/build-linux-development-enviroment/05-application-software-recommendation/' },
					],
				},
				{
					label: '网络设备部署与公网访问',
					collapsed: true,
					items: [
						{ label: '总览', link: '/network-device-deployment-and-public-network-access/' },
						{ label: '01 - 安装部署 PVE 虚拟化平台', link: '/network-device-deployment-and-public-network-access/01-install-and-deploy-the-pve-virtualization-platform/' },
						{ label: '02 - KVM 虚拟机与 LXC 容器', link: '/network-device-deployment-and-public-network-access/02-kvm-virtual-machines-and-lxc-containers/' },
						{ label: '03 - 搭建 OpenVPN 服务器', link: '/network-device-deployment-and-public-network-access/03-set-up-an-openvpn-server/' },
						{ label: '04 - frp - 一个无需公网 IP 的内网穿透方式', link: '/network-device-deployment-and-public-network-access/04-frp-a-method-for-intranet-penetration-that-does-not-require-a-public-ip/' },
						{ label: '05 - Tailscale 平替 OpenVPN', link: '/network-device-deployment-and-public-network-access/05-tailscale-replaces-openvpn/' },
						{ label: '06 - 使用 Cloudflare Warp 与 Zero Trust 搭建团队 VPN', link: '/network-device-deployment-and-public-network-access/06-building-a-team-vpn-using-cloudflare-warp-and-zero-trust/' },	
					],
				},
				{
					label: '网络安全与数据安全参赛笔记',
					collapsed: true,
					items: [
						{ label: '6.15 数据安全刷题笔记', link: '/cybersecurity-and-data-security/data-security-6-15-note/' },
					],
				},
			],
		}),
	],
});
