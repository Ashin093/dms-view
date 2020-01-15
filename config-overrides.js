const { override, fixBabelImports, addLessLoader,addBabelPlugins } =
    require('customize-cra');
module.exports = override(
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
    }),
    addLessLoader({
        javascriptEnabled: true,
        modifyVars: { '@primary-color': '#1890FF' },
    }),
    //配置支持高阶组件链式调用的装饰器写法
    addBabelPlugins(
        [
            '@babel/plugin-proposal-decorators',
            {
                legacy:true
            }
        ]
    )
);