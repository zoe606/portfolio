import Assets from './data/assets';
import type { Skill } from './types';
import svelte from './md/svelte.md?raw';
import Colors from './data/colors';

const s = (skill: Skill) => skill;

export type ArrayElementType<ArrayType extends readonly unknown[]> =
	ArrayType extends readonly (infer ElementType)[] ? ElementType : never;

const MY_SKILLS = [
	s({
		slug: 'go',
		color: Colors.Blue,
		description:
			'Go is a statically typed, compiled language designed for simplicity and efficiency. It excels in building scalable and performant applications. With its clean syntax and robust standard library, Go is an excellent choice for various development projects.',
		logo: Assets.Go,
		name: 'Go'
	}),
	s({
		slug: 'php',
		color: Colors.Blue,
		description:
			'PHP is a server-side scripting language widely used for web development. Known for its flexibility and ease of integration, PHP empowers developers to create dynamic and interactive web applications.',
		logo: Assets.Php,
		name: 'PHP'
	}),
	s({
		slug: 'ruby',
		color: Colors.Red,
		description:
			'Ruby is a dynamic, object-oriented programming language that emphasizes simplicity and productivity. Its known for its elegant syntax and developer-friendly features, making it a favorite for building web applications.',
		logo: Assets.Ruby,
		name: 'Ruby'
	}),
	s({
		slug: 'redis',
		color: Colors.Red,
		description:
			'Redis is an in-memory data structure store known for its speed and flexibility. It is often used as a caching mechanism and for real-time analytics, providing high-performance solutions for various applications.',
		logo: Assets.Redis,
		name: 'Redis'
	}),
	s({
		slug: 'pgsql',
		color: Colors.Blue,
		description:
			'PostgreSQL is a powerful, open-source relational database management system. With its advanced features, extensibility, and SQL compliance, PostgreSQL is a reliable choice for handling complex data requirements.',
		logo: Assets.PostgreSQL,
		name: 'PostgreSQL'
	}),
	s({
		slug: 'mysql',
		color: Colors.Orange,
		description:
			'MySQL is a popular open-source relational database management system. It is known for its reliability, ease of use, and scalability, making it a go-to choice for many web applications.',
		logo: Assets.Mysql,
		name: 'MySql'
	}),
	s({
		slug: 'mongo-db',
		color: Colors.Green,
		description:
			'MongoDB is a NoSQL database known for its flexibility and scalability. It stores data in a JSON-like format, allowing for dynamic schema design and efficient handling of large volumes of data.',
		logo: Assets.MongoDB,
		name: 'MongoDB'
	}),
	s({
		slug: 'docker',
		color: Colors.Black,
		description:
			'Docker is a platform for automating the deployment and scaling of applications in lightweight, portable containers. It simplifies the process of packaging, distributing, and running applications across diverse environments.',
		logo: Assets.Docker,
		name: 'Docker'
	}),
	s({
		slug: 'rabbit-mq',
		color: Colors.Orange,
		description:
			'RabbitMQ is a message broker that facilitates communication between distributed systems. It provides a reliable and scalable solution for handling message queues in various applications.',
		logo: Assets.RabbitMQ,
		name: 'RabbitMq'
	}),
	s({
		slug: 'kafka',
		color: Colors.Black,
		description:
			'Apache Kafka is a distributed streaming platform known for its high-throughput, fault-tolerance, and real-time data processing capabilities. It is widely used for building scalable and resilient data pipelines.',
		logo: Assets.Kafka,
		name: 'Kafka'
	}),
	s({
		slug: 'grpc',
		color: Colors.Blue,
		description:
			'gRPC is a modern open-source framework for building efficient and scalable APIs. It uses the HTTP/2 protocol for communication and Protocol Buffers for serialization, providing high-performance and language-agnostic RPC.',
		logo: Assets.Grpc,
		name: 'Grpc'
	}),
	s({
		slug: 'js',
		color: Colors.Yellow,
		description:
			'JavaScript is a versatile and widely used programming language that powers dynamic content on the web. With its extensive ecosystem and support for both client and server-side development, JavaScript is essential for modern web applications.',
		logo: Assets.JavaScript,
		name: 'Javascript'
	}),
	s({
		slug: 'ts',
		color: Colors.Blue,
		description:
			'TypeScript is a superset of JavaScript that adds static typing and other features to enhance developer productivity and code quality. It allows for better collaboration and catches potential errors early in the development process.',
		logo: Assets.TypeScript,
		name: 'Typescript'
	}),
	s({
		slug: 'css',
		color: Colors.Blue,
		description:
			'CSS (Cascading Style Sheets) is a fundamental technology for styling web pages. It enables developers to control the layout and appearance of HTML elements, creating visually appealing and responsive user interfaces.',
		logo: Assets.CSS,
		name: 'CSS'
	}),
	s({
		slug: 'bootstrap',
		color: Colors.Purple,
		description:
			'Bootstrap is a popular front-end framework that simplifies the process of designing responsive and aesthetically pleasing websites. It provides a set of pre-designed components and styles, allowing for rapid development.',
		logo: Assets.Bootstrap,
		name: 'Bootstrap'
	}),
	s({
		slug: 'html',
		color: Colors.Orange,
		description:
			'HTML (Hypertext Markup Language) is the standard markup language for creating web pages and web applications. It structures content on the web and serves as the foundation for building interactive and accessible sites.',
		logo: Assets.HTML,
		name: 'HTML'
	}),
	s({
		slug: 'git',
		color: Colors.Orange,
		description:
			'Git is a distributed version control system widely used for tracking changes in source code during software development. It facilitates collaboration among developers and provides a robust history of project modifications.',
		logo: Assets.Git,
		name: 'Git'
	}),
	// s({
	// 	slug: 'sass',
	// 	color: 'pink',
	// 	description:
	// 		'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent orci enim, congue sit amet justo eget, consequat sollicitudin libero. Etiam iaculis lectus tempor, hendrerit enim in, luctus arcu. Maecenas id enim et nibh ullamcorper auctor ac eu est. Donec imperdiet, diam quis malesuada faucibus, nibh ex gravida sapien, posuere pharetra nunc libero tristique turpis. Sed egestas laoreet semper. In hac habitasse platea dictumst. Praesent vitae est nec felis maximus facilisis. Duis luctus dui id urna tristique varius. Ut vulputate leo arcu, non bibendum arcu pulvinar eget. Fusce semper elit ut congue lacinia. Suspendisse magna diam, tempus vitae interdum eget, dictum vitae nisl. Praesent quis fringilla tortor. Donec vitae sagittis dui.',
	// 	logo: Assets.Sass,
	// 	name: 'Sass'
	// }),
	s({
		slug: 'laravel',
		color: Colors.Cyan,
		description:
			'Laravel is a PHP web application framework known for its elegant syntax and developer-friendly features. It simplifies common tasks in web development, allowing developers to focus on building robust and scalable applications.',
		logo: Assets.Laravel,
		name: 'Laravel'
	}),
	s({
		slug: 'yii2',
		color: Colors.Cyan,
		description:
			'Yii 2 is a high-performance PHP framework designed for developing modern web applications. It follows the MVC pattern and includes features such as code generation and a powerful caching system for efficient development.',
		logo: Assets.Yii2,
		name: 'Yii 2'
	}),
	s({
		slug: 'ruby-on-rails',
		color: Colors.Red,
		description:
			'Ruby on Rails, or Rails, is a web application framework written in Ruby. It follows the convention over configuration (CoC) and dont repeat yourself (DRY) principles, streamlining the development of robust and maintainable applications.',
		logo: Assets.Rails,
		name: 'Ruby On Rails'
	}),
	s({
		slug: 'jquery',
		color: Colors.Black,
		description:
			'jQuery is a fast and lightweight JavaScript library designed to simplify HTML document traversal and manipulation, event handling, and animation. It makes front-end development more accessible and efficient.',
		logo: Assets.Jquery,
		name: 'Jquery'
	}),
	s({
		slug: 'reactjs',
		color: Colors.Blue,
		description:
			'Reactjs is a JavaScript library for building user interfaces, particularly for single-page applications where data can change over time. It enables developers to create reusable UI components, making the development process modular and efficient.',
		logo: Assets.ReactJs,
		name: 'Reactjs'
	}),
	// s({
	// 	slug: 'svelte',
	// 	color: '#F08A5D',
	// 	description: svelte,
	// 	logo: Assets.Svelte,
	// 	name: 'Svelte'
	// })
	s({
		slug: 'vuejs',
		color: Colors.Green,
		description:
			' Vue.js is a progressive JavaScript framework for building user interfaces. It is approachable, versatile, and easy to integrate, making it an excellent choice for both small-scale projects and larger applications.',
		logo: Assets.VueJs,
		name: 'Vuejs'
	}),
	s({
		slug: 'aws-s3',
		color: Colors.Orange,
		description:
			' Architected solutions using Amazon S3, a versatile and scalable object storage service from AWS. Leveraged S3 to store and retrieve any amount of data, providing seamless access to web-scale computing resources. Ensured durability, high availability, and low-latency performance for diverse use cases, from simple storage to complex big data analytics and multimedia hosting.',
		logo: Assets.S3,
		name: 'Amazon S3'
	}),
	// s({
	// 	slug: 'ci',
	// 	color: Colors.Orange,
	// 	description: ' PHP Framework',
	// 	logo: Assets.CI,
	// 	name: 'Codeigniter'
	// })
];

export default MY_SKILLS;

export const getSkills = (...slugs: Array<string>): Array<Skill> =>
	MY_SKILLS.filter((it) => slugs.includes(it.slug));
