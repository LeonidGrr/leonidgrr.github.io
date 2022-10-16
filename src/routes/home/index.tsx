import { FunctionComponent } from 'preact';
import { RoutableProps } from 'preact-router';
import { Scene3D } from '../../components/Scene3D';
import Explore from '../../components/Explore';
import Header from '../../components/Header';

export type Config = {
    name: string
    header: string
    sub: Record<string, {
		name: string
		desc: string
	}>
};

const titleMap: Config = {
    name: "Programmer's lair",
    header: "programmer's lair",
    sub: {
		about: {
			name: 'About',
			desc: `Hello! My name is Leonid. I am just humble programmer trying to learn something in a spare time.\n\n This is little demo pag made of:\n - Interactive 3D scene built with ThreeJS library.\n - Overlay user interface built with PreactJS.\n\n Feel free to tap and click around to find small features.`,
		},
        screen: {
			name: 'Screen - ThreeJS render target',
			desc: 'This is just an example of THREEJS render target with tip of interactivity - mesh geometry is randomly trasformed when you press some key. Also note interactive 3D keyboard model...',
		},
        windows: {
			name: 'Raindrops shader',
			desc: 'I like rain.\n To program this raindrops I used ShaderMaterial with fragment shader, based on <a href="https://www.shadertoy.com/view/ltffzl">beautiful shadertoy by Heartfelt</a>.',
		},
        particles: {
			name: 'Particle text geometry',
			desc: '4096 particles evenly distributed inside pre-generated text geometries.',
		},
    },
};

const Home: FunctionComponent<RoutableProps> = () => {
	return (
		<Scene3D>
			<Header header={titleMap.header} />
			<Explore
				titleMap={titleMap}
			/>
		</Scene3D>
	);
};

export default Home;
