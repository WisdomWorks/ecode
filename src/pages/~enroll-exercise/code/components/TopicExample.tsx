export const TopicExample = () => {
  return (
    <div className="mb-4 flex flex-col">
      <h4 className="font-bold capitalize">Example 1:</h4>
      <div className="ml-4 mt-1 flex flex-col">
        <span>
          <span className="font-semibold">Input:</span> nums = [2,7,11,15],
          target = 9
        </span>
        <span>
          <span className="font-semibold">Output:</span> [0,1]
        </span>
        <span>
          <span className="font-semibold">Explanation:</span> Because nums[0] +
          nums[1] == 9, we return [0, 1]
        </span>
      </div>
    </div>
  )
}
