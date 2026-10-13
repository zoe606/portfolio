import type { Asset } from '#lib/types.js';
import { theme } from '#lib/stores/theme.svelte.js';
import { asset } from '$app/paths';
import type { AssetPath } from '$app/types';

/**
 * File names in static/logos/. A missing file fails the type check.
 * `infer P` makes TypeScript check each path in the AssetPath union separately.
 */
type File = AssetPath extends infer P ? (P extends `logos/${infer Name}` ? Name : never) : never;

const gh = (file: File) => asset(`logos/${file}`);
const a = (light: File, dark?: File): Asset =>
	dark ? { dark: gh(dark), light: gh(light) } : gh(light);

const Assets = {
	AWS: a('aws.svg'),
	Bootstrap: a('bootstrap.svg'),
	C: a('c.svg'),
	Cpp: a('cpp.svg'),
	Celery: a('celery.svg'),
	Django: a('django.svg'),
	Flask: a('flask.svg'),
	Go: a('go.svg'),
	Kafka: a('kafka.svg'),
	Neo4j: a('neo4j.svg'),
	Nginx: a('nginx.svg'),
	Numpy: a('numpy.svg'),
	Pandas: a('pandas.svg'),
	RabbitMQ: a('rabbitmq.svg'),
	Rust: a('rust.svg'),
	Scrapy: a('scrapy.png'),
	Selenium: a('selenium.svg'),
	Docker: a('docker.svg'),
	Kubernetes: a('kubernetees.svg'),
	Csharp: a('csharp.svg'),
	Xamarin: a('xamarin.svg'),
	TypeScript: a('ts.png'),
	VueJs: a('vue.png'),
	ReactJs: a('react.svg'),
	Dart: a('dart.png'),
	Kotlin: a('kotlin.png'),
	Python: a('python.png'),
	NodeJs: a('node.png'),
	Deno: a('deno.png'),
	Svelte: a('svelte.png'),
	ExpressJs: a('express.png'),
	JavaScript: a('js.png'),
	Fastify: a('fastify.svg'),
	NestJs: a('nest.svg'),
	Quasar: a('quasar.svg'),
	SolidJs: a('solid.svg'),
	Electron: a('electron.png'),
	Flutter: a('flutter.svg'),
	Java: a('java.png'),
	AdonisJs: a('adonis.png'),
	Android: a('android.png'),
	Angular: a('angular.png'),
	PostgreSQL: a('postgres.png'),
	Firebase: a('firebase.png'),
	Sass: a('sass.png'),
	Unknown: a('no-img.svg'),
	MongoDB: a('mongodb.svg'),
	Redis: a('redis.svg'),
	Tailwind: a('tailwind.svg'),
	HTML: a('html.svg'),
	Premiere: a('premiere.svg'),
	Photoshop: a('photoshop.svg'),
	CSS: a('css.svg'),
	AfterEffects: a('after-effects.svg'),
	Illustrator: a('illustrator.svg'),
	Nuxt: a('nuxt.png'),
	Vite: a('vite.png'),
	Vitest: a('vitest.svg'),
	Jest: a('jest.png'),
	Unocss: a('unocss.svg'),
	Ruvy: a('ruvy.svg'),
	Postcss: a('postcss.svg'),
	Ruby: a('ruby.svg'),
	Php: a('php.svg'),
	Mysql: a('mysql.svg'),
	Grpc: a('grpc.svg'),
	Laravel: a('laravel.svg'),
	Yii2: a('yii2.svg'),
	Rails: a('rails.svg'),
	Git: a('git.svg'),
	Jquery: a('jquery.svg'),
	Ocsaver: a('ocsaver.svg'),
	S3: a('aws-s3.svg'),
	Privy: a('privy.png'),
	Docotel: a('docotel.png'),
	Dhealth: a('dhealth.webp'),
	CheckProof: a('checkproof.png'),
	Luce: a('luce.svg'),
	Stdkreatif: a('stdkreatif.png'),
	UlasId: a('ulasid.jpeg'),
	CI: a('codeigniter.svg'),
	Iate: a('iate.png'),
	NextJs: a('nextjs.svg'),
	Astro: a('astro.svg'),
	Themx: a('themx.svg')
};

export default Assets;

// Reading theme.isDark here makes every template that calls this update when the theme changes.
export const getAssetURL = (asset: Asset): string =>
	typeof asset === 'string' ? asset : theme.isDark ? asset.dark : asset.light;
