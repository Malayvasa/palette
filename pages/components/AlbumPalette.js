export default function AlbumPalette({ colors }) {
  return (
    <div className="my-8 lg:ml-8 flex flex-col gap-0">
      {colors && (
        <>
          <div className="">
            <div
              key={colors}
              className="flex flex-col max-w-[300px] w-96 overflow-hidden border-x-2 border-2 border-white border-opacity-10 rounded-t-md p-4 backdrop-blur-xl items-center justify-between bg-black bg-opacity-5"
            >
              <div className="flex w-full justify-between">
                {colors.map((color, key) => {
                  return (
                    <div
                      key={color[key]}
                      className={`w-8 h-8 aspect-square rounded-md`}
                      style={{ backgroundColor: color }}
                    ></div>
                  );
                })}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
