
# include <Siv3D.hpp> // OpenSiv3D v0.4.3
# include <emscripten.h>

Font* font;
Texture* cat;

// 猫の座標
Vec2 catPos(640, 450);

EM_JS(const char*, glfwGetKeysSiv3D, (void* windowid), {
	var window = GLFW.WindowFromId(windowid);
	if (!window) return 0;
	if (!window.keysBuffer) {
		window.keysBuffer = Module._malloc(349 /* GLFW_KEY_LAST + 1 */);
	}
	Module.HEAPU8.set(window.keys, window.keysBuffer);
	return window.keysBuffer;
})

void MainLoop()
{
	if (!System::Update()) {
		emscripten_cancel_main_loop();
		return;
	}

	// テキストを画面の中心に描く
	(*font)(U"Hello, Siv3D!🐣").drawAt(Scene::Center(), Palette::Black);

	// 大きさをアニメーションさせて猫を表示する
	cat->resized(100 + Periodic::Sine0_1(1s) * 20).drawAt(catPos);

	// マウスカーソルに追従する半透明の赤い円を描く
	Circle(Cursor::Pos(), 40).draw(ColorF(1, 0, 0, 0.5));

	// [A] キーが押されたら
	if (KeyA.down())
	{
		// Hello とデバッグ表示する
		Print << U"Hello!";
	}

	// ボタンが押されたら
	if (SimpleGUI::Button(U"Move the cat", Vec2(600, 20)))
	{
		// 猫の座標を画面内のランダムな位置に移動する
		catPos = RandomVec2(Scene::Rect());
	}
}

void Main()
{
	// 背景を水色にする
	Scene::SetBackground(ColorF(0.8, 0.9, 1.0));

	// 大きさ 60 のフォントを用意
	font = new Font(60);

	// 猫のテクスチャを用意
	cat = new Texture(Emoji(U"🐈"));

	emscripten_set_main_loop(&MainLoop, 0, 1);
}