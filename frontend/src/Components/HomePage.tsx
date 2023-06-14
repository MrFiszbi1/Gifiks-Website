export const Home = () => {
	const gif = "../src/assets/gifs/Dr_Evil_Welcome.gif";
	return (
		<div className="mx-auto mb-3">
			<h1 className="text-4xl font-bold mb-3 text-center">Welcome To The Gifiks Website</h1>
			<h2 className="text-2xl font-bold mb-8 text-center">Share your favorite gifs with the world</h2>
			<div
				key={gif}
				className="bg-primary flex flex-col items-center rounded border w-4/5 mx-auto pt-5"
			>
				<img
					className="rounded"
					src={gif}
					alt="Welcome Gif"
					style={{ width: "960px", height: "554px" }}
				/>
				<h2 className="text-3xl mb-2">Have fun!</h2>
			</div>

		</div>
	);
};




