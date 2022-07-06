import { FunctionComponent } from 'preact';
import { RoutableProps, route } from 'preact-router';
import { useContext, useEffect } from 'preact/hooks';
import { Context3D } from '../../components/Context3D';
import Explore from '../../components/Explore';
import Header from '../../components/Header';
import Loader from '../../components/Loader';

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
    },
};

const Home: FunctionComponent<RoutableProps> = () => {
	const { currentCamera, changeCamera, webGLAvailable, isEnabled } = useContext(Context3D);

	useEffect(() => {
		if (!webGLAvailable && isEnabled) {
			route('/nowebgl', true);
		}
	}, [webGLAvailable, isEnabled]);

	return (
		<>
			<Header header={titleMap.header} />
			<Explore
				currentCamera={currentCamera}
				onChangeCamera={changeCamera}
				titleMap={titleMap}
			/>
			{webGLAvailable && isEnabled && (
				<>
					<Loader />
					<canvas className="webgl" tabIndex={1} />
				</>
			)}
		</>
	);
};

export default Home;
