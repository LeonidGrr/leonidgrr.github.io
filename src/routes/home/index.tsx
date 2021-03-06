import { FunctionComponent } from 'preact';
import { RoutableProps } from 'preact-router';
import { useContext } from 'preact/hooks';
import { Context3D } from '../../components/Context3D';
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
    name: 'My dev lair',
    header: 'my dev lair',
    sub: {
		about: {
			name: 'About',
			desc: `Hello! My name is Leonid. I am just humble programmer trying to learn something in a spare time.\n This is little demo page. Feel free to tap and click around.`,
		},
        screen: {
			name: 'Screen - ThreeJS render target',
			desc: 'For now this is just an example of THREEJS render target...',
		},
        windows: {
			name: 'Raindrops shader',
			desc: 'I like rain.\n To program this raindrops I used ThreeJS ShaderMaterial and custom fragment shader, partially based on <a href="https://www.shadertoy.com/view/ltffzl">beautiful shadertoy by Heartfelt</a>.',
		},
    },
};

const Home: FunctionComponent<RoutableProps> = () => {
	const { loader } = useContext(Context3D);

	return (
		<>
			<Header header={titleMap.header} />
			<Explore
				titleMap={titleMap}
			/>
			{loader}
		</>
	);
};

export default Home;
