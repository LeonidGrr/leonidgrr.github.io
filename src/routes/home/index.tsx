import { FunctionComponent } from 'preact';
import { RoutableProps } from 'preact-router';
import { useContext } from 'preact/hooks';
import { Context3D } from '../../components/Context3D';
import Explore from '../../components/Explore';
import Header from '../../components/Header';

export type Config = {
    name: string,
    header: string,
    desc: string,
    sub: Record<string, string>,
};

const titleMap: Config = {
    name: 'My dev lair',
    header: 'my dev lair',
	desc: `Hello! My name is Leonid. I am just humble programmer trying to learn something in a spare time.\n This is little demo page. Feel free to tap and click around.`,
    sub: {
        screen: 'For now this is just an example of THREEJS render target...',
        windows: 'I like rain.\nTo program this raindrops I used <a href="https://www.shadertoy.com/view/ltffzl">beautiful shadertoys from Heartfelt</a> as a reference\n and then ported them into ThreeJS ShaderMaterial.',
    },
};

const Home: FunctionComponent<RoutableProps> = () => {
	const { currentCamera, changeCamera, loader } = useContext(Context3D);

	return (
		<>
			<Header header={titleMap.header} />
			<Explore
				currentCamera={currentCamera}
				onChangeCamera={changeCamera}
				titleMap={titleMap}
			/>
			{loader}
		</>
	);
};

export default Home;
